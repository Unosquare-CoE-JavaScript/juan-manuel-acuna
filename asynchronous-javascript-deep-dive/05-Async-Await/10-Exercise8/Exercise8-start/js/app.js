var MAINAPP = (function (nsp) {
  "use strict";

  let url = "https://jsonplaceholder.typicode.com/";

  /*
    Change this code to use async await. Make sure to use promise.all so that we await all three pieces of data without awaiting each individually which would take much longer.

    Which pattern do you prefer for this application? promises or async await?
    */

  //   fetch(url + "posts/")
  //     .then((response1) => response1.json())
  //     .then((posts) => (nsp.posts = posts))
  //     .catch((err) => console.log(`Problem retrieving posts: ${err}`));

  //   fetch(url + "comments/")
  //     .then((response2) => response2.json())
  //     .then((comments) => (nsp.comments = comments))
  //     .catch((err) => console.log(`Problem retrieving comments: ${err}`));

  //   fetch(url + "todos/")
  //     .then((response3) => response3.json())
  //     .then((todos) => (nsp.todos = todos))
  //     .catch((err) => console.log(`Problem retrieving todos: ${err}`));

  (async function () {
    try {
      const f1 = fetch(url + "posts/");
      const f2 = fetch(url + "comments/");
      const f3 = fetch(url + "todos/");

      const res = await Promise.all([f1, f2, f3]);
      console.log("Promise accomplished");
      nsp.posts = await res[0].json();
      nsp.comments = await res[1].json();
      nsp.todos = await res[2].json();
    } catch (e) {
      console.log(e);
    }
  })();

  console.log("Remaining Code.");

  //public
  return nsp;
})(MAINAPP || {});
