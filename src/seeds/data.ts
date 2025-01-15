const username = [
    'Silto',
    'Fayton',
    'Avey',
    'Mintront',
];

const email = [
    'water@sage.com',
    'fire@sage.com',
    'wind@sage.com',
    'earth@sage.com'
];

// Get a random item given an array
export const getRandomArrItem = (arr: any) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
export const getRandomUsername =() =>
  `${getRandomArrItem(username)}`;

// Function to generate random assignments that we can add to student object.
export const getRandomEmail = (int: number) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      name: getRandomArrItem(email),
      score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};
