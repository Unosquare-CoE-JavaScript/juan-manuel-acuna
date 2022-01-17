//Create a function that will retrieve the posts from the jsonplaceholder site (https://jsonplaceholder.typicode.com/posts). Set up the function so you can pass in the userID and the function will assign only the posts for that user to a variable. The data should be stored in an array.

// let scores = [87, 65, 90, 100, 55, 0, 92, 43, 85];
// let passScores = scores.filter((item) => item > 60);
// console.log(passScores);
let user3Posts;
const getJsonPlaceholder = async function (userId) {
  const url = "https://jsonplaceholder.typicode.com/posts";
  let posts = await fetch(url).then((data) => data.json());
  return await posts.filter((item) => item.userId === userId);
};

getJsonPlaceholder(3).then((val) => (user3Posts = val));

setTimeout(() => {
  console.log(user3Posts);
}, 1000);
