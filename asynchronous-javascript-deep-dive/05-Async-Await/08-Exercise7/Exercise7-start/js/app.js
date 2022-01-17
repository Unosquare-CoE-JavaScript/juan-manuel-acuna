var MAINAPP = (function (nsp) {
  "use strict";

  let url = "https://jsonplaceholder.typicode.com/";

  /*
    The following promise code is inside a module pattern. Change the promise code so that it uses async await instead. You will want to use an IIFE for this. Make sure to catch any errors.
    */
  (async function () {
    try {
      let data = await fetch(url + "posts/");
      let posts = await data.json();
      nsp.posts = posts;
    } catch (error) {
      console.log(`Problem retrieving posts: ${error}`);
    }
  })();

  // .then(posts => nsp.posts = posts)
  // .catch(err => console.log(`Problem retrieving posts: ${err}`));

  //public
  return nsp;
})(MAINAPP || {});
