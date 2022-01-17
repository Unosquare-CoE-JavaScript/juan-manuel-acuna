"use strict";

// const plainFunction = function () {
//   console.log("start");
//   return "Done";
// };

// let result = plainFunction();

// const plainFunction2 = async function () {
//   console.log("start");
//   return "Done";
// };

// plainFunction2()
//   .then((result) => console.log("result2: ", result))
//   .catch(console.error);

// async function plainFunction3() {
//   console.log("start");
//   return "Done";
// }

// plainFunction3()
//   .then((result) => console.log("result3: ", result))
//   .catch(console.error);

const asyncFunc = async function () {
  let p1 = await asyncFunction();
  console.log({ p1 });
  console.log(`${p1}-more info`);
};

asyncFunc();
