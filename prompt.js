import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "You are a helpful assistant." }],
    model: "gpt-4o",
  });

  console.log(completion.choices[0]);
}

async function generateBulletPost(topic, client_profile) {
  try {
    const bulletPostResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Dont label anything. I want the response to be ready to post on LinkedIn. Also dont put any dashes, bullets, atricks or anything. all i want is plain text"
        },
        {
          role: "user",
          content: `Create a compelling one-liner to grab attention for a LinkedIn post about ${topic}. The tone should be ${client_profile["personal_brand"]} and it should reflect the goal of ${client_profile["primary_goals"]}. It should be a rhetorical question thats counter intuitive to ${topic} and it should be 10 tokens. skip a line, then on the next line Create a one-liner follow-up that answers the question in hook. it should be 10 tokens. leave a blank line, and then in the next line, Give a 5 bullets about the hook and what it means that follows ${clientProfile["personal_brand"]} and has a tone of ${clientProfile["content_preferences"]}. each step should have a topic line and the next line is the info. Make the info part two sentences. Skip a line, and on the next line put a statement that leaves the reader feeling the authors tone of ${clientProfile["mission"]}. Should be an action statement. It should be 15 tokens`,
        },
      ],
      model: "gpt-4o",
    });

    let bulletPost = bulletPostResponse.choices[0].message.content.trim();

    if (bulletPost.startsWith('"') && bulletPost.endsWith('"')) {
      bulletPost = bulletPost.slice(1, -1);
    }

    console.log(bulletPost);
  } catch (error) {
    console.error("Error generating LinkedIn post:", error);
  }
}

async function generateStoryPost(topic, client_profile) {
  try {
    const bulletPostResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Dont label anything. I want the response to be ready to post on LinkedIn. Also dont put any dashes, bullets, atricks or anything. all i want is plain text"
        },
        {
          role: "user",
          content: `first line: Attention grabber about a lesson you learned regarding ${topic}. It should be ten tokens
          skip a line and on the next one write 3 senteces telling a bit of the story where you lerened the lesson. the tone should be ${clientProfile["personal_brand"]} and should be about ${clientProfile["mission"]}
          skip a line and on the next one write a 1 one liner that is the crux of the story
          skip a line and on the next one finish the story and end off with the lesson you learned
          skip a line and on the next one tell the reader how they should try to impelement the lesson too in two senteces
          skip a line and on the next one call to action that follows the story.
          the story should be corporate appropriate`,
        },
      ],
      model: "gpt-4o",
    });

    let bulletPost = bulletPostResponse.choices[0].message.content.trim();

    if (bulletPost.startsWith('"') && bulletPost.endsWith('"')) {
      bulletPost = bulletPost.slice(1, -1);
    }

    console.log(bulletPost);
  } catch (error) {
    console.error("Error generating LinkedIn post:", error);
  }
}
const clientProfile = {
  primary_goals:
    "generate leads, find employees, spread awareness, celebrate milestones, attract investors",
  mission: "make technology accessible to underserved populations",
  core_values: "equality, community support, technology improving lives",
  target_audience: "investors, potential clients, partners",
  key_achievements:
    "campaign in public schools in East Plano and Dallas improved student grades",
  leadership_style: "empowering and facilitative",
  personal_brand: "supportive and innovative",
  content_preferences:
    "regular updates, technology trends (AI-driven), startup challenges",
  posting_schedule: "posts at least three times a week",
  inspirations: "influenced by Kai Sinat",
  success_metrics:
    "engagement metrics (clicks and interactions), lead conversions",
};

const topic = "AI in videogames";
generateStoryPost(topic, clientProfile);
