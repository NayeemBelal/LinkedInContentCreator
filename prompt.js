import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "You are a helpful assistant." }],
    model: "gpt-4o",
  });

  console.log(completion.choices[0]);
}

async function generateLinkedInPost(topic, client_profile) {
  try {
    // Generate the hook
    const hookResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Create a compelling one-liner to grab attention for a LinkedIn post about ${topic}. The tone should be ${client_profile["personal_brand"]} and it should reflect the goal of ${client_profile["primary_goals"]}. It should be a rhetorical question thats counter intuitive to ${topic} and it should be 10 tokens.`,
        },
      ],
      model: "gpt-4o",
    });

    let postHook = hookResponse.choices[0].message.content.trim();

    if (postHook.startsWith('"') && postHook.endsWith('"')) {
      postHook = postHook.slice(1, -1);
    }

    console.log(postHook);

    const rehookResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Create a one-liner follow-up that answers the question in ${postHook} and provides stability to ${topic}. it should be 10 tokens`,
        },
      ],
      model: "gpt-4o",
    });

    let rehook = rehookResponse.choices[0].message.content.trim();

    if (rehook.startsWith('"') && rehook.endsWith('"')) {
      rehook = rehook.slice(1, -1);
    }

    console.log(rehook);

    const stepsResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "dont format any of the topic lines",
        },
        {
          role: "user",
          content: `Give a 3 bullets about ${topic} that follows ${clientProfile["personal_brand"]} and has a tone of ${clientProfile["content_preferences"]}. each step should have a topic line and the next line is the info. each step should be 20 tokens long`,
        },
      ],
      model: "gpt-4o",
    });

    let steps = stepsResponse.choices[0].message.content.trim();

    if (steps.startsWith('"') && steps.endsWith('"')) {
      steps = steps.slice(1, -1);
    }

    console.log(steps);

    const endingResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Leave the reader feeling the authors tone of ${clientProfile["mission"]}. Should be an action statement. It should be 15 tokens`,
        },
      ],
      model: "gpt-4o",
    });

    let ending = endingResponse.choices[0].message.content.trim();

    if (ending.startsWith('"') && ending.endsWith('"')) {
      ending = ending.slice(1, -1);
    }

    console.log(ending);
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

const topic = "LLMs";
generateLinkedInPost(topic, clientProfile);
