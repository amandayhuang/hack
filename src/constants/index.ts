export const interests = [
  { id: 1, title: "Art", icon: `🎨`, category: "Sports" },
  { id: 2, title: "Crafts", icon: `🧶`, category: "Sports" },
  { id: 3, title: "Design", icon: `💡`, category: "Sports" },
  { id: 4, title: "Sports", icon: `⚽`, category: "Sports" },
  { id: 5, title: "Dancing", icon: `💃`, category: "Sports" },
  { id: 6, title: "Photography", icon: `📷`, category: "Sports" },
  { id: 7, title: "Singing", icon: `👨‍🎤`, category: "Sports" },
  { id: 8, title: "Writing", icon: `🖋`, category: "Sports" },
  { id: 9, title: "Museums", icon: `🖼`, category: "Sports" },
  { id: 10, title: "Music", icon: `🎵`, category: "Sports" },
  { id: 11, title: "Cooking", icon: `🧑‍🍳`, category: "Sports" },
  { id: 12, title: "Baking", icon: `🥐`, category: "Sports" },
  { id: 13, title: "Board Games", icon: `🀄`, category: "Sports" },
  { id: 14, title: "Gardening", icon: `🌼`, category: "Sports" },
  { id: 15, title: "Theater", icon: `🎭`, category: "Sports" },
  { id: 16, title: "Movies", icon: `🎬`, category: "Sports" },
  { id: 17, title: "Television", icon: `📺`, category: "Sports" },
  { id: 18, title: "Comedy", icon: `😂`, category: "Sports" },
  { id: 19, title: "Reading", icon: `📖`, category: "Sports" },
  { id: 20, title: "Pets", icon: `🐈`, category: "Sports" },
  { id: 21, title: "Family", icon: `👩‍👩‍👧‍👦`, category: "Sports" },
];

const questions = [
  `What's your favorite season?`,
  `What's a food that reminds you of childhood?`,
  `Are you reading any books?`,
  `What's your favorite meal to cook?`,
  `What was your first job?`,
  `What's a skill or hobby you've always wanted to learn?`,
  `What was your first concert?`,
  `Would you rather have the ability to time travel to the past or the future?`,
  `Would you rather be 11 feet tall or nine inches tall?`,
  `Would you rather eat only pizza for a year or not eat any pizza for five years?`,
  `What job did you want to have when you were a child?`,
];

export const getRandomQuestion = () =>
  questions[Math.floor(Math.random() * questions.length)];
