var MAINAPP = (function (nsp) {
  "use strict";

  /*
    Change this code so that it uses Promise.all to respond once all of the promises have returned. Provide a notification to the console when the promises have completed.
    */

  const url = "https://jsonplaceholder.typicode.com/";
  let target;
  target = "posts";
  const r1 = fetch(url + target + "/")
    .then((response) => response.json())
    .then((data) => (nsp.posts = data))
    .catch((err) => console.log(`Unable to retrieve ${target}: ${err}`));

  target = "comments";
  const r2 = fetch(url + target + "/")
    .then((response) => response.json())
    .then((data) => (nsp.comments = data))
    .catch((err) => console.log(`Unable to retrieve ${target}: ${err}`));

  target = "todos";
  const r3 = fetch(url + target + "/")
    .then((response) => response.json())
    .then((data) => (nsp.todos = data))
    .catch((err) => console.log(`Unable to retrieve ${target}: ${err}`));

  const r4 = Promise.reject("Testing static methods");

  Promise.allSettled([r4, r1, r2, r3, r4])
    .then((nsp) => nsp)
    .then((val) => {
      console.log(val[0]);
      console.log(val[1]);
      console.log(val[2]);
      console.log(val[3]);
      console.log(val[4]);
    });

  // Promise.any example
  Promise.any([r4, r1, r2, r3, r4])
    .then((nsp) => nsp)
    .then((val) => {
      console.log(val);
    });
  //   console.log(nsp);

  //public
  return nsp;
})(MAINAPP || {});
