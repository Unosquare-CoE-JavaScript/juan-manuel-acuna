/*
Using the random number code below, set up a generator function that will act as a producer of a random value. It should return a random number whenever next is invoked. Set the function up so it can be used to create a random number between 1 and 100 or 1 and 10 or between 1 and any number; basically the end number should be whatever is passed into the function. 
*/

// This one has an infinite loop ... that makes me a little nervous
const randNumberGeneratorV1 = function* (end) {
  while (true) {
    let value = Math.floor(Math.random() * end) + 1;
    yield value;
  }
};

const randNumberGeneratorV2 = function* (end) {
  let counter = 0;
  let limit = 99999;
  while (counter < limit) {
    let value = Math.floor(Math.random() * end) + 1;
    yield value;
    counter++;
  }
};

let rng = randNumberGeneratorV1(100);

/**
 * rng.next()
 * -> {value: 9, done: false}
 *
 * rng.next()
 * -> {value: 45, done: false}
 *
 * rng.next().value
 * 8
 *
 * rng.next().value
 * 21
 *
 * rng.next().value
 * 35
 *
 * rng.next().value
 * 11
 *
 * rng.next().value
 * 98
 *
 */
