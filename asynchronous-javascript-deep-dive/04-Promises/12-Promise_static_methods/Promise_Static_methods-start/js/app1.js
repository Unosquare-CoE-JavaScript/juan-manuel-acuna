"use strict";

let firstName = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("Steven");
    }, 4000);
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
      // reject("W.");
      resolve("W.");
    }, 7000);
  });
};

Promise.all([firstName(), lastName(), middleName()])
  .then((val) => {
    console.log(`First: ${val[0]}, Middle: ${val[2]}, Last: ${val[1]} `);
  })
  .catch(console.error);

Promise.race([firstName(), lastName(), middleName()])
  .then(console.log)
  .catch(console.error);
