"use strict";

let arr = ["a", "b", "c", "d"];

let it = arr[Symbol.iterator]();

let str = "string";
for (let v of str) {
  // This works
  console.log(v);
}

let obj = {
  1: "one",
  2: "two",
  3: "three",
};
/*
for (let v of obj) {
  // This doest't work, because an object is not an iterable object ... but we can do it
  console.log(v);
}
*/

obj[Symbol.iterator] = function* () {
  // Check this, it's a generator
  for (let i = 1; i <= 3; i++) {
    yield this[i];
  }
};
for (let v of obj) {
  // Now this works!!!!!!!!
  console.log(v);
}

let it2 = obj[Symbol.iterator]();
