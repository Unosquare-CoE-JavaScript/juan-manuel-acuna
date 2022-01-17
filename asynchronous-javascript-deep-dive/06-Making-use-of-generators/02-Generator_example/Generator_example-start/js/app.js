"use strict";

// Original
// const fibonacci = function (len, nums = [0, 1]) {
//   let num1 = nums[0],
//     num2 = nums[1],
//     next,
//     cnt = 2;

//   while (cnt < len) {
//     next = num1 + num2;
//     num1 = num2;
//     num2 = next;
//     nums.push(next);
//     cnt++;
//   }

//   return nums;
// };

const fibonacci = function* (len = 999, nums = [0, 1]) {
  let num1 = nums[0],
    num2 = nums[1],
    next,
    cnt = 2;

  while (cnt < len) {
    next = num1 + num2;
    num1 = num2;
    num2 = next;
    nums.push(next);
    cnt++;
    yield nums;
  }
  return nums;
};

let fib = fibonacci(20);

// This is my own fibonacci.
// I did it just for fun
// const myFibonacci = (len, nums = [0, 1]) => {
//   let n0 = nums[0];
//   let n1 = nums[1];
//   let arr = [...nums];
//   for (let index = 2; index < len; index++) {
//     const res = n0 + n1;
//     n0 = n1;
//     n1 = res;
//     arr.push(res);
//   }
//   return arr;
// };
// console.log(myFibonacci(20));
