import { google } from "googleapis";
import fs from "fs";
import axios from "axios";
import { Readable } from "stream";

const credentials = JSON.parse(
  fs.readFileSync(
    "/Users/nayeembelal/Downloads/keen-alignment-424923-t0-30e0cb5bf278.json",
    "utf8"
  )
);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
  ],
});

export async function createSheet(posts) {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });
  const drive = google.drive({ version: "v3", auth: client });

  const request = {
    resource: {
      properties: {
        title: "Content Calendar",
      },
    },
  };

  try {
    const response = await sheets.spreadsheets.create(request);
    const spreadsheetId = response.data.spreadsheetId;
    console.log(`Spreadsheet created with ID: ${spreadsheetId}`);

    const permissions = {
      type: "anyone",
      role: "writer",
    };

    await drive.permissions.create({
      resource: permissions,
      fileId: spreadsheetId,
      fields: "id",
    });

    // Handle image uploads and permissions
    for (const post of posts) {
      if (post.image) {
        const imageResponse = await axios({
          url: post.image,
          responseType: "arraybuffer",
        });

        const buffer = Buffer.from(imageResponse.data, "binary");

        const stream = Readable.from(buffer);

        const fileMetadata = {
          name: "Image",
        };

        const media = {
          mimeType: "image/jpeg",
          body: stream,
        };

        const file = await drive.files.create({
          resource: fileMetadata,
          media: media,
          fields: "id, webContentLink",
        });

        await drive.permissions.create({
          resource: {
            type: "anyone",
            role: "writer",
          },
          fileId: file.data.id,
        });

        post.image = file.data.webContentLink;
      }
    }

    const values = [
      ["Date", "Topic", "Content", "Image"],
      ...posts.map((post) => [post.date, post.topic, post.content, post.image]),
    ];

    const updateRequest = {
      spreadsheetId,
      range: "Sheet1!A1:D" + values.length,
      valueInputOption: "RAW",
      resource: {
        values,
      },
    };

    await sheets.spreadsheets.values.update(updateRequest);
    console.log("Data added to spreadsheet");

    const batchUpdateRequest = {
      spreadsheetId,
      resource: {
        requests: [
          {
            updateDimensionProperties: {
              range: {
                sheetId: 0,
                dimension: "COLUMNS",
                startIndex: 0,
                endIndex: 1,
              },
              properties: {
                pixelSize: 120,
              },
              fields: "pixelSize",
            },
          },
          {
            updateDimensionProperties: {
              range: {
                sheetId: 0,
                dimension: "COLUMNS",
                startIndex: 1,
                endIndex: 2,
              },
              properties: {
                pixelSize: 300,
              },
              fields: "pixelSize",
            },
          },
          {
            updateDimensionProperties: {
              range: {
                sheetId: 0,
                dimension: "COLUMNS",
                startIndex: 2,
                endIndex: 3,
              },
              properties: {
                pixelSize: 480,
              },
              fields: "pixelSize",
            },
          },
        ],
      },
    };

    await sheets.spreadsheets.batchUpdate(batchUpdateRequest);

    // Construct the URL
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
    console.log(`Spreadsheet URL: ${sheetUrl}`);
  } catch (err) {
    console.error("Error creating spreadsheet:", err);
  }
}
