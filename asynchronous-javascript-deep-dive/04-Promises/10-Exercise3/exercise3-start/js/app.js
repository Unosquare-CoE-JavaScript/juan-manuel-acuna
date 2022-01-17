"use strict";

//First, add the setTimeout code as shown in the intro to this exercise. Then modify the code by creating a promise so that the code can run asynchronously.

const massiveProcess = function (num) {
  num = Number(num);
  return new Promise((resolve, reject) => {
    if (isNaN(num)) {
      reject("Number is required");
    } else {
      let result = 0;
      // setTimeout(() => {
      for (let i = num ** 7; i >= 0; i--) {
        result += Math.atan(i) * Math.tan(i);
      }
      resolve(result);
      // }, 0);
    }
  });
};

massiveProcess(12)
  .then((result) => console.log("The number is: " + result))
  .catch(console.error());

//More processing later on
console.log(5 * 5 + 100);
