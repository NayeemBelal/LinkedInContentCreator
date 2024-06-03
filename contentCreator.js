import {
  generateOpposingViews,
  generateStoryPost,
  getPosts,
} from "./prompt.js";
import { generatePostDates } from "./generateDates.js";
import { createSheet } from "./createSheets.js";

async function generateAllPosts(opposingViewsTopics, storyTopics) {
  console.log("Generating opposing views post:");
  await generateOpposingViews(opposingViewsTopics);

  console.log("\nGenerating story post:");
  await generateStoryPost(storyTopics);

  let posts = getPosts();
  shuffleArray(posts);
  let postDates = generatePostDates(posts.length);

  posts = posts.map((post, index) => ({
    ...post,
    date: postDates[index].toLocaleDateString(),
  }));

  console.log(posts);

  createSheet(posts);
}

const client_profile = {
  primary_goals:
    "Prioritize lead generation through LinkedIn; establish as a thought leader in software development and cybersecurity.",
  mission:
    "Develop the next generation of coders and hackers, creating a local talent pool.",
  core_values:
    "Foster development of young talent and encourage risk-taking and innovation in startups.",
  target_audience:
    "Business leaders in the southern U.S. (Louisiana, Texas, Georgia) and professionals in the tech, gaming, and cybersecurity sectors.",
  key_achievements:
    "Mentoring in entrepreneurial spaces, advocating for human-led game creation, engagement in youth coding programs.",
  leadership_style:
    "Laid-back and collaborative with a focus on work-life balance and a positive, evolving company culture.",
  personal_brand:
    "Interests in powerlifting, chess, and business inform a leadership style that blends personal pursuits with professional engagements.",
  content_preferences:
    "Create informative content on technology and cybersecurity, engage with community through mentoring, celebrate personal and community achievements.",
  posting_schedule:
    "Regular updates on current events in tech, with intermittent personal and professional achievements highlights.",
  inspirations:
    "Influenced by Alex Hormozi, Ryan Holiday, and the marketing strategies of ThreeSixtyEight.",
  success_metrics:
    "Focus on post impressions and profile views to gauge the success of LinkedIn activities.",
};

const topic = [
  "The Impact of Tech on Youth Education in Southern U.S.",
  "Celebrating a Year of Volunteering with Local Youth Startups",
  "Why I love powerlifting",
  "I love helping young entreprenuers success",
  "I grew up playing chess and I love chess so I want to talk about how my brain developed better because of chess",
];

const opposingViewsTopics = [
  "AI should not replace humans in video game creation",
  "Chess is a super great way to train you brain",
  "Mentoring young entreprenuers should be a top priority",
  "powerlifting has a lot to do with startups",
];

const storyTopics = [
  "A story about how I helped a noob entreprenuer navigate the business world",
  "I grew up playing chess and I love chess so I want to talk about how my brain developed better because of chess",
  "Building a bond with the powerlifting community",
  "How I learned my lesson to become more secure in terms of cybersecurty.",
];

generateAllPosts(opposingViewsTopics, storyTopics);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
