import {
  generateImageWithText,
  generateLiveContent,
  generateOpposingViews,
  generatePollPost,
  generateStoryPost,
  getPosts,
} from "./prompt.js";
import { generatePostDates } from "./generateDates.js";
import { createSheet } from "./createSheets.js";

async function generateAllPosts(
  liveContentLink,
  liveContentTopics,
  opposingViewsTopics,
  storyTopics,
  imageTopics
) {
  console.log("\nGenerating live content posts:");
  await generateLiveContent(liveContentLink, liveContentTopics);

  console.log("Generating opposing views posts:");
  await generateOpposingViews(opposingViewsTopics);

  console.log("\nGenerating story posts:");
  await generateStoryPost(storyTopics);

  console.log("Generating multimedia posts:");
  await generateImageWithText(imageTopics);

  let posts = getPosts();
  shuffleArray(posts, 1);
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

generateAllPosts(
  liveContentLink,
  liveContentTopics,
  opposingViewsTopics,
  storyTopics,
  imageTopics
);

function shuffleArray(array, n) {
  for (let i = array.length - 1; i > n; i--) {
    let j = Math.floor(Math.random() * (i - n + 1)) + n;
    [array[i], array[j]] = [array[j], array[i]];
  }
}
