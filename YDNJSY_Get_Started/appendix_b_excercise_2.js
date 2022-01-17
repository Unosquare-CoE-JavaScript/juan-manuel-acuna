function range(start, end) {
  start = start * 1;

  if (end === undefined) {
    return function ender(end) {
      return loop(start, end);
    };
  } else {
    return loop(start, end);
  }

  function loop(start, end) {
    let arr = [];
    for (let i = start; i <= end; i++) {
      arr.push(i);
    }
    return arr;
  }
}

console.log(range(3, 3)); // [3]
console.log(" ");
console.log(range(3, 8)); // [3,4,5,6,7,8]
console.log(" ");
console.log(range(3, 0)); // []
console.log(" ");

var start3 = range(3);
var start4 = range(4);

console.log(start3(3)); // [3]
console.log(" ");
console.log(start3(8)); // [3,4,5,6,7,8]
console.log(" ");
console.log(start3(0)); // []
console.log(" ");
console.log(start4(6)); // [4,5,6]
