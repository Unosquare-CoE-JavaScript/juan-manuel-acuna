"use strict";
const url = "https://jsonplaceholder.typicode.com/todos";
// Version 1
(async function () {
  await fetch(url)
    .then((data) => data.json())
    .then((obj) => console.log(obj));
})();

// Version 2
(async function () {
  let data = await fetch(url);
  let obj = await data.json();
  console.log(obj);
})();

console.log("Other code");
