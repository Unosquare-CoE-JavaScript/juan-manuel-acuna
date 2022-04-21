# Chapter 3

#### Iteration

- The importance of the iterator pattern is in adhering to a standard way of processing data iteratively, which creates cleaner and easier to understand code, as opposed to having every data structure/source define its own custom way of handling its data.
- The iterator pattern defines a data structure called an “iterator” that has a reference to an underlying data source, which exposes a method like `next()`, whose return is an object called an _iterator result_; the object has value and done properties, where done is a boolean that is false until the iteration over the underlying data source is complete.
  #### Consuming Iterators
- ES6 included several mechanisms (syntax and APIs) for standardized consumption of these iterators.
- One such mechanism is the for..of loop:

```jsx
    // given an iterator of some data source:
    var it = /* .. */;
    // loop over its results one at a time
    for (let val of it) {
        console.log(`Iterator value: ${ val }`);
    }
    // Iterator value: ..
    // Iterator value: ..
    // ..
```

#### The `...` Operator

- This operator actually has two symmetrical forms: _spread_ and _rest_ (or _gather_).
- The _spread_ form is an iterator-consumer.
- To _spread_ an iterator, you have to have something to spread it into. There are two possibilities in JS: an array or an argument list for a function call:

```jsx
// An array spread:

// spread an iterator into an array,
// with each iterated value occupying
// an array element position.
var vals = [...it];
```

```jsx
// A function call spread:

// spread an iterator into a function,
// call with each iterated value
// occupying an argument position.
doSomethingUseful(...it);
```

#### Iterables

- The iterator-consumption protocol is technically defined for consuming iterables; an iterable is a value that can be iterated over.
- Since arrays are iterables, we can shallow-copy an array using iterator consumption via the ... spread operator:

```jsx
var greeting = "Hello world!";
var chars = [...greeting];

chars;
// [ "H", "e", "l", "l", "o", " ",
//   "w", "o", "r", "l", "d", "!" ]
```

- Maps have a different default iteration than seen here, in that the iteration is not just over the map’s values but instead its entries. An entry is a tuple (2-element array) including both a key and a value.

```jsx
// given two DOM elements, `btn1` and `btn2`

var buttonNames = new Map();
buttonNames.set(btn1, "Button 1");
buttonNames.set(btn2, "Button 2");

for (let [btn, btnName] of buttonNames) {
  // [btn, btnName] <= array destructuring
  btn.addEventListener("click", function onClick() {
    console.log(`Clicked ${btnName}`);
  });
}
```

```jsx
// if we want to consume only the values of the above buttonNames map,
// we can call values() to get a values-only iterator:
for (let btnName of buttonNames.values()) {
  console.log(btnName);
}
// Button 1
// Button 2
```

```jsx
// Or if we want the index and value in an array iteration,
// we can make an entries iterator with the entries() method:
var arr = [10, 20, 30];
for (let [idx, val] of arr.entries()) {
  console.log(`[${idx}]: ${val}`);
}
// [0]: 10
// [1]: 20
// [2]: 30
```

#### Closure

- Closure is when a function remembers and continues to access variables from outside its scope, even when the function is executed in a different scope.
- Closure is part of the nature of a function (then, objects don’t get closures, functions do).
- To observe a closure, you must execute a function in a different scope than where that function was originally defined.

```jsx
function greeting(msg) {
  return function who(name) {
    console.log(`${msg}, ${name}!`);
  };
}

var hello = greeting("Hello");
var howdy = greeting("Howdy");

hello("Kyle");
// Hello, Kyle!
hello("Sarah");
// Hello, Sarah!
howdy("Grant");
// Howdy, Grant!
```

```jsx
// A closure can actually observe (or make!) updates to variables over time:
function counter(step = 1) {
  var count = 0;
  return function increaseCount() {
    count = count + step;
    return count;
  };
}
var incBy1 = counter(1);
var incBy3 = counter(3);

incBy1(); //1
incBy1(); //2
incBy3(); //3
incBy3(); //6
incBy3(); //9
```

- Closure is most common when working with asynchronous code, such as with callbacks:

```jsx
function getSomeData(url) {
  ajax(url, function onResponse(resp) {
    console.log(`Response (from ${url}): ${resp}`);
  });
}

getSomeData("https://some.url/wherever");
// Response (from https://some.url/wherever): ...
```

#### `this` Keyword

- Is **_not_** a reference to the function itself, nor pointing to the instance that a method belongs to.
- When a function is defined, it is attached to its enclosing scope via closure. Scope is the set of rules that controls how references to variables are resolved.
- Scope is static and contains a fixed set of variables available at the moment and location you define a function, but a function’s execution context is dynamic, entirely dependent on **_how it is called_** (regardless of where it is defined or even called from).
- _Execution context_ is that it’s a tangible object whose properties are made available to a function while it executes.

```jsx
function classroom(teacher) {
  return function study() {
    console.log(`${teacher} says to study ${this.topic}`);
  };
}
var assignment = classroom("Kyle");

// Calling without providing it any execution context.
assignment();
// Kyle says to study undefined  -- Oops :(

var homework = {
  topic: "JS",
  assignment: assignment,
};
// Providings a direct context
homework.assignment();
// Kyle says to study JS

var otherHomework = {
  topic: "Math",
};
// Calling with a "call"
assignment.call(otherHomework);
// Kyle says to study Math
```

The benefit of `this-aware` functions —and their dynamic context— is the ability to more flexibly re-use a single function with data from different objects. A function that closes over a scope can never reference a different scope or set of variables. But a function that has dynamic this context awareness can be quite helpful for certain tasks.

#### Prototypes

- A prototype is a characteristic of an object, and specifically resolution of a property access.
- Think about a prototype as a linkage between two objects. This prototype linkage occurs when an object is created; it’s linked to another object that already exists.
- A series of objects linked together via prototypes is called the “prototype chain.”
- The purpose of this prototype linkage (i.e., from an object B to another object A) is so that accesses against B for properties/methods that B does not have, are delegated to A to handle. Delegation of property/method access allows two (or more!) objects to cooperate with each other to perform a task.

```jsx
var homework = {
  topic: "JS",
};

// homework.toString() works even though homework doesn’t
// have a toString() method defined; the delegation invokes
// Object.prototype.toString() instead.
homework.toString(); // [object Object]
```

#### Object Linkage

- To define an object prototype linkage, you can create the object using the Object.create(..) utility:

```jsx
var homework = {
  topic: "JS",
};

var otherHomework = Object.create(homework);

otherHomework.topic; // "JS"

homework.topic; // "JS"

otherHomework.topic; // "JS"

otherHomework.topic = "Math";

otherHomework.topic; // "Math"

homework.topic; // "JS" -- not "Math"
```

#### `this`Revisited

```jsx
var homework = {
  study() {
    console.log(`Please study ${this.topic}`);
  },
};

var jsHomework = Object.create(homework);
jsHomework.topic = "JS";
jsHomework.study();
// Please study JS

var mathHomework = Object.create(homework);
mathHomework.topic = "Math";
mathHomework.study();
// Please study Math
```
