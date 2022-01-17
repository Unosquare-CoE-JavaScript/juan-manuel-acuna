"use strict";

asyncFunction()
  .then((msg) => console.log(msg))
  .catch(console.error())
  .finally(console.log("cleaning up tasks"));
