"use strict";

async function num1() {
  await setTimeout(() => {
    console.log(1);
  }, 1500);
  return 1;
}

async function num2() {
  await setTimeout(() => {
    console.log(2);
  }, 1000);
  return 2;
}

async function main() {
  console.log("Start Main");
  num1();
  num2();
  console.log("End Main");
  return "This is main returned text";
}

main().then(console.log);

console.log("Last Line");
