"use strict";

let firstName = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("Steven");
    }, 1000);
  });
};

let lastName = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("Hancock");
    }, 3000);
  });
};

let middleName = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("W.");
    }, 4000);
  });
};

(async function () {
  try {
    let msg = await Promise.all([firstName(), lastName(), middleName()]);
    console.log("msg: ", msg[0] + " " + msg[2] + " " + msg[1]);
  } catch (error) {
    console.log(error);
  }
})();
// Promise.all([firstName(), lastName(), middleName()])
//   .then(function (msg) {
//     console.log(msg[0] + " " + msg[2] + " " + msg[1]);
//   })
//   .catch(function (msg) {
//     console.log(msg);
//   });

console.log("Remaining Code");