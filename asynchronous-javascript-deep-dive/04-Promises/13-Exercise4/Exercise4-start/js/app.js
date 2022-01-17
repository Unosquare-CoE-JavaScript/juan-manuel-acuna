var MAINAPP = (function (nsp) {
  "use strict";

  /*
    Change this code so that it uses Promise.all to respond once all of the promises have returned. Provide a notification to the console when the promises have completed.
    */

  const url = "https://jsonplaceholder.typicode.com/";
  let target;
  const r1 = () => {
    target = "posts";
    fetch(url + target + "/")
      .then((response) => response.json())
      .then((data) => (nsp.posts = data))
      .catch((err) => console.log(`Unable to retrieve ${target}: ${err}`));
  };

  const r2 = () => {
    target = "comments";
    fetch(url + target + "/")
      .then((response) => response.json())
      .then((data) => (nsp.comments = data))
      .catch((err) => console.log(`Unable to retrieve ${target}: ${err}`));
  };

  target = "todos";
  const r3 = fetch(url + target + "/")
    .then((response) => response.json())
    .then((data) => (nsp.todos = data))
    .catch((err) => console.log(`Unable to retrieve ${target}: ${err}`));

  Promise.all([r1(), r2(), r3]) // <-- In this case, r3 goes without parenthesis because is not a fat arrow fuction. Arrow functions need to be invoked directly, but simple functions don't.
    .then((nsp) => nsp)
    .then(console.log("We have recived all data"))
    .catch(console.error);

  //   console.log(nsp);

  //public
  return nsp;
})(MAINAPP || {});
