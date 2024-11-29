// Function to get a random element from an array
function getRandomValueFromArray(array) {
  // Ensure the array is not empty
  if (array.length === 0) {
    return undefined;
  }

  // Generate a random index based on the array length
  const randomIndex = Math.floor(Math.random() * array.length);

  // Return the element at the random index
  return array[randomIndex];
}

module.exports = {
  getRandomValueFromArray,
};
