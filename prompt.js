import OpenAI from "openai";

const openai = new OpenAI();
export const posts = [];

export async function generateLiveContent(liveContentLink, liveContentTopics) {
  for (let i = 0; i < liveContentTopics.length; i++) {
    if (liveContentTopics[i] != "") {
      console.log("Generate post #" + (i + 1));
      try {
        const liveContentResponse = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `Dont label anything. I want the response to be ready to post on LinkedIn. Also dont put any dashes, bullets, atricks or anything. all i want is plain text. The post will be written on this article at this link ${liveContentLink[i]}`,
            },
            {
              role: "user",
              content: `Given the article link ${liveContentLink[i]}, create a concise and engaging LinkedIn post about the article at this link ${liveContentLink[i]} with this topic: ${liveContentTopics[i]}. Start with a catchy hook sentence to grab attention. Follow with a three-sentence summary that captures the main points of the article. Then, provide a personal opinion on the topic to add a unique perspective. Conclude with a one-liner that ties back to the theme of the article. The post should be easy to read, with each section clearly separated. At then, say something like, read more here and link the article.`,
            },
          ],
          model: "gpt-4",
        });

        let liveContentPost =
          liveContentResponse.choices[0].message.content.trim();

        let image_url = await imageGeneration(liveContentTopics[i]);

        const newPost = {
          topic: liveContentTopics[i],
          content: liveContentPost,
          image: image_url,
        };

        posts.push(newPost);
      } catch (error) {
        console.error("Error generating LinkedIn post:", error);
      }
    }
  }
}

export async function generateOpposingViews(opposingViewsTopics) {
  for (let i = 0; i < opposingViewsTopics.length; i++) {
    if (opposingViewsTopics[i] != "") {
      console.log("Generate post #" + (i + 1));
      try {
        const opposingViewsResponse = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content:
                "Dont label anything. I want the response to be ready to post on LinkedIn. Also dont put any dashes, bullets, atricks or anything. all i want is plain text",
            },
            {
              role: "user",
              content: `Create a post structured as a dialogue between two people with opposing views on ${opposingViewsTopics[i]}. The dialogue should consist of five exchanges where each person presents their perspective concisely. Each statement in the dialouge has to be consice, straight to the point and short. After the dialogue, include a transition where the person who supports the main argument (identified as "You") explains why they hold their position and then invites the audience to discuss. Again, You are supporting the topic, and the person you are conversing is against it.
  
            1. **my friend (Anti ${opposingViewsTopics[i]}):** Brief statement supporting ${opposingViewsTopics[i]}.
            2. **You (Pro ${opposingViewsTopics[i]}):** Concise counter-argument against ${opposingViewsTopics[i]}.
            3. **my friend:** Further support for ${opposingViewsTopics[i]}.
            4. **You:** Deeper insight into the drawbacks of ${opposingViewsTopics[i]}.
            5. **my friend:** Mention of potential benefits of ${opposingViewsTopics[i]}.
            6. **You:** Final point emphasizing the negatives or risks associated with ${opposingViewsTopics[i]}.
            
            **Transition to Audience:**
            After the dialogue, [You] should address the audience directly, summarizing why they believe ${opposingViewsTopics[i]} should be approached with caution (or supported, depending on your stance). Encourage audience engagement by asking their views and experiences related to ${opposingViewsTopics[i]}.
            `,
            },
          ],
          model: "gpt-4",
        });

        let opposingViewsPost =
          opposingViewsResponse.choices[0].message.content.trim();

        let image_url = await imageGeneration(opposingViewsTopics[i]);

        const newPost = {
          topic: opposingViewsTopics[i],
          content: opposingViewsPost,
          image: image_url,
        };

        posts.push(newPost);
      } catch (error) {
        console.error("Error generating LinkedIn post:", error);
      }
    }
  }
}

export async function generateStoryPost(storyTopics) {
  for (let i = 0; i < storyTopics.length; i++) {
    if (storyTopics[i] != "") {
      console.log("Generate post #" + (i + 1));
      try {
        const storyPostResponse = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content:
                "Dont label anything. I want the response to be ready to post on LinkedIn. Also dont put any dashes, bullets, atricks or anything. all i want is plain text. No call to actions and no promoting of my business",
            },
            {
              role: "user",
              content: `first line: Attention grabber about a lesson you learned regarding ${storyTopics[i]}. It should be ten tokens
            skip a line and on the next one write 3 senteces telling a bit of the story where you lerened the lesson.
            skip a line and on the next one write a 1 one liner that is the crux of the story
            skip a line and on the next one finish the story and end off with the lesson you learned
            Then end the post by saying something along the lines of your happy now that you know this`,
            },
          ],
          model: "gpt-4",
        });



//         Write a LinkedIn post about coding. The post should be informal, concise, and clear. no hashtags or emojis in the post. Start with a short, catchy sentence that is a fact you are arguing. Use short sentences and a conversational tone throughout the post. Avoid cheesy catchlines, lessons learned, or abbreviations. End with a more human, sometimes jokey note. Make sure the post is engaging and relatable. Here is an example of the style I like:

// Write the LinkedIn post in a similar style:

// LLMs are fascinating but flawed

// We hear a lot about Large Language Models (LLMs) these days. They can write essays, code, and even chat like humans. Sounds impressive, right? But let's be real—are they really that useful?

// Sure, LLMs can generate text, but they often miss the mark. They lack true understanding and can get facts wrong. It's like having a conversation with someone who's great at pretending they know everything but can't actually do much.

// In the end, LLMs are a fun tool but not the game-changer they're hyped up to be. They’re more like a novelty than a necessity.

// Let’s keep our expectations in check and maybe enjoy a good laugh at their quirky outputs. 
        const storyPost = storyPostResponse.choices[0].message.content.trim();

        let image_url = await imageGeneration(storyTopics[i]);

        const newPost = {
          topic: storyTopics[i],
          content: storyPost,
          image: image_url,
        };

        posts.push(newPost);
      } catch (error) {
        console.error("Error generating LinkedIn post:", error);
      }
    }
  }
}

export async function generatePollPost(pollTopics) {
  for (let i = 0; i < pollTopics.length; i++) {
    if (pollTopics[i] != "") {
      try {
        const pollPostResponse = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content:
                "Dont label anything. I want the response to be ready to post on LinkedIn. you are funny and humorous",
            },
            {
              role: "user",
              content: `Given a specific topic for a LinkedIn poll post, generate a concise, engaging, and humorous poll post. The post should include a catchy title with emojis, a brief introduction explaining the significance of the topic, and two voting options each accompanied by a witty or funny sentence.
            Topic: ${pollTopics[i]}
            Title: Poll Title with Emojis
            Introduction: [2-3 sentences explaining the topic]
            Poll:
            👍 Yes - [Funny or clever response supporting the idea]
            👎 No - [Funny or clever response opposing the idea]`,
            },
          ],
          model: "gpt-4",
        });

        const pollPost = pollPostResponse.choices[0].message.content.trim();

        const newPost = {
          topic: pollTopics[i],
          content: pollPost,
        };

        posts.push(newPost);
      } catch (error) {
        console.error("Error generating LinkedIn post:", error);
      }
    }
  }
}

export async function generateImageWithText(imageTopics) {
  for (let i = 0; i < imageTopics.length; i++) {
    if (imageTopics[i] != "") {
      let image_url = await imageGeneration(imageTopics[i]);

      const newPost = {
        topic: imageTopics[i],
        content: "Multimedia content. See image link for post content",
        image: image_url,
      };

      posts.push(newPost);
    }
  }
}

// Helper functions

export function getPosts() {
  return posts;
}

export async function imageGeneration(imageContent) {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: imageContent,
    n: 1,
    size: "1024x1024",
  });

  let image_url = response.data[0].url;

  return image_url;
}

const liveContentLink = [
  "https://newatlas.com/technology/chatgpt-is-funnier/",
  "https://www.ben-evans.com/benedictevans/2024/7/9/the-ai-summer",
];

const liveContentTopics = [
  "AI is funnier than humans",
  "Using the artle, talk about AI growth this summer.",
];

const storyTopics = [
  "A funny story I heard from someone else about how they helped a young startup with a contraint and what he learnd from it",
  "Tell the people about a time that you did something funnily embarassing and learned from it",
  "A funny story I heard from someone else about how they helped a young startup with a contraint and what he learnd from it",
  "How much AI is changing the work",
  "How the current job market is so bad and the tips you woud give to new grads",
  "A story about your love of video games adn how you dont want AI to change everything",
  "How you one time helped a new grad fix their resume and the lessons you would give to other new grads.",
  "Startup mentourship is good",
  "cybersecurity is way differnet than is one even 5 years ago",
  "Startup problems",
];

const opposingViewsTopics = [
  "AI is taking over the job market",
  "The difference between a good engineer and a great one",
  "Cybersecurity is super important in todays world",
];

const imageTopics = [
  "AI is changing everything",
  "AI is replacing too many jobs",
  "Cybersecurity is important",
  "keep gaming naturally created, not AI generated",
  "Startup mentour",
];
