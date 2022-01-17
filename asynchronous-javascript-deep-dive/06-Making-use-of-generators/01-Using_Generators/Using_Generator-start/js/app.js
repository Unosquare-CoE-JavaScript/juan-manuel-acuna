"use strict";

// function* genTest() {
//   let x = 0;
//   console.log("start"); // start
//   x++; // x = 1 (it's increased before the yield)
//   yield x; // {value: 1, done: false}
//   console.log(x); // x = 1
//   x++; // x = 2
//   console.log(x); // x = 2
//   yield x++; // x = 2 // {value: 2, done: false}
//   // x = 3 (it get increased _after_ the yield)
//   console.log("end");
//   return x; // { value: 3, done: true };
// }

// const gen = genTest();

/**
 * let value = gen.next() // stopped before the first yield.
 * -> start
 * -> undefined
 *
 * value
 * -> {value: 1, done: false}
 *
 * value = gen.next() // stopped before the second yield
 * -> 1
 * -> 2
 * -> {value: 2, done: false}
 *
 * value
 * -> {value: 2. done: false}
 *
 * value = gen.next()
 * -> end
 * -> {value: 3, done: true}
 *
 * value
 * -> {value: 3, done: true}
 *
 * value = gen.next()
 * -> {value: undefined, done true}
 */

const test = function* test() {
  yield 10;
  yield 20;
  yield 30;
};

let it = test();

console.log("After code");

/**
 * -> After code // Check this! the first code to be shown is the last line in the program
 *
 * it
 * -> test {<suspended>}
 *
 * it.next()
 * -> {value: 10, done: false}
 *
 * it.next()
 * -> {value: 20, done: false}
 *
 * it.next()
 * -> {value: 30, done: false}
 *
 * it.next()
 * -> {value: undefined, done: true}
 */
