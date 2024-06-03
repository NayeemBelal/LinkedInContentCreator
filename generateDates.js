export function generatePostDates(numPosts) {
  const dates = [];
  const postsPerWeek = Math.ceil(numPosts / 4);
  const startDate = new Date();

  // Ensure the start date is a Monday
  while (startDate.getDay() !== 1) {
    startDate.setDate(startDate.getDate() + 1);
  }

  let currentDate = new Date(startDate);

  const weekdays = {
    2: [1, 3], // Monday, Wednesday
    3: [1, 3, 5], // Monday, Wednesday, Friday
    5: [1, 2, 3, 4, 5], // Monday to Friday
  };

  const selectedWeekdays = weekdays[Math.min(postsPerWeek, 5)];

  for (let i = 0; i < numPosts; i++) {
    const week = Math.floor(i / postsPerWeek);
    const dayIndex = i % postsPerWeek;
    const dayOfWeek = selectedWeekdays[dayIndex];

    // Calculate the date for the current post
    const postDate = new Date(startDate);
    postDate.setDate(postDate.getDate() + week * 7 + (dayOfWeek - 1));

    dates.push(postDate);
  }

  return dates;
}
