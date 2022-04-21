# Chapter 2

The best way to learn JS is to start writing JS.

#### Each File is a Program

- In JS, each standalone file is its own separate program. The reason this matters is primarily around error handling.
- Since JS treats files as programs, one file may fail (during parse/compile or execution) and that will not necessarily prevent the next file from being processed.
- The only way multiple standalone .js files act as a single program is by sharing their state (and access to their public functionality) via the “global scope.”.

#### Values

The most fundamental unit of information in a program is a value. Values are data. They’re how the program maintains state. Values come in two forms in JS: primitive and object.

- Primitive: strings, booleans, numbers, symbols, null and undefined. _(in another words, everything **different** from an array [] or an object {})_
- Object: Arrays and Objects.

Functions, like arrays, are a special kind (aka, sub-type) of object.

#### Single/double quotes vs backticks example

```jsx
const names = ["Juan", "Manuel"];

// Double-quoted
console.log("My name is ${ names }.");
// My name is ${ names }.

// Simgle-quoted
console.log("My name is ${ names }.");
// My name is ${ names }.

// Backtick
console.log(`My name is ${names}.`);
// My name is My name is Juan,Manuel.
// The result is called interpolation

// Backtick, again
console.log(`My name is ${names[1]}.`);
// My name is My name is Manuel.
// The result is called interpolation
```

#### Value Type Determination

- For distinguishing values, the typeof operator tells you its built-in type, if primitive, or
  "object" otherwise:

```jsx
typeof 42; // "number"
typeof "abc"; // "string"
typeof true; // "boolean"
typeof undefined; // undefined
typeof null; // "object" (ok, I know, that's not cool)
typeof { a: 1 }; // "object"
typeof [1, 2, 3]; // "object"
typeof function hello() {}; // "function"
```

- Converting from one value type to another, such as from string to number, is referred to in JS as “coercion.”

#### Declaring and Using Variables

Block-scoping is very useful for limiting how widespread variable declarations are in our programs, which helps pre- vent accidental overlap of their names.

- `var`: global scope variable. Can be re-asigned.
- `let`: local or block scope variable. Can be re-asigned.
- `const`: local or block scope variable. It's important to say, this are not “unchangeable”, they just cannot be re-assigned.
- `functions`: can create an indentifier oustide this scope. Their behave then is similar to `var`.
- `catch`: (in a `try - catch`). Is a block-scoped variable, the result behave like a `let`,

#### Functions

- In JS, we should consider “function” to take the broader meaning of another related term: “procedure.” A procedure is a collection of statements that can be invoked one or more times, may be provided some inputs, and may give back one or more outputs.
- This is called a **_function declaration_** because it appears as a statement by itself, not as an expression in another statement.

```jsx
function awesomeFunction(coolThings) {
  // ..
  return amazingStuff;
}
```

- A **_function declaration statement_**, a function expression can be defined and assigned like this:

```jsx
// let awesomeFunction = ..
// const awesomeFunction = ..
var awesomeFunction = function (coolThings) {
  // ..
  return amazingStuff;
};
```

- In JS, functions are values that can be assigned (as shown in this snippet) and passed around. In fact, JS functions are a special type of the object value type. Not all languages treat functions as values, but it’s essential for a language to support the functional programming pattern, as JS does.
- Functions also can return values using the return keyword. You can _only return a single value_, but if you have more values to return, you can _wrap_ them up into a _single object/array_.
- Since functions are values, they can be assigned as properties on objects:

```jsx
var whatToSay = {
  greeting() {
    console.log("Hello!");
  },
  question() {
    console.log("What's your name?");
  },
  answer() {
    console.log("My name is Kyle.");
  },
};
whatToSay.greeting();
// Hello!
```

#### Comparisons

#### #Equal...ish (Equality and Equivalence)

- `===`equality compasion check value and type, without allowing coercion (type conversion). `==`, in another hand, allow coercion.

```jsx
3 === 3.0; // true
"yes" === "yes"; // true
null === null; // true
false === false; // true

42 === "42"; // false
"hello" === "Hello"; // false
true === 1; // false
0 === null; // false
"" === null; // false
null === undefined; // false
```

But we must be careful with:

```jsx
NaN === NaN; // false
0 === -0; // true
```

We can use `Number.isNaN(..)` or `Object.is(..)` for `NaN`, and `Object.is(..)` for `-0` checks.

#### #Comparsion between objects:

```jsx
    [1,2,3] === [1,2,3];            // false
    { a: 42 } === { a: 42 }         // false
    (x => x * 2) === (x => x * 2)   // false
```

That's because the values are not referencing to the same.

```jsx
var x = [1, 2, 3];
// assignment is by reference-copy, so
// y references the *same* array as x,
// not another copy of it.

var y = x;
y === x; // true
y === [1, 2, 3]; // false
x === [1, 2, 3]; // false
```

This can be explained thinking in the firsts `y` and `x` are a reference to the same initial array, and the last two lines are comparing an old array with a new one.

JS does not define `===` as structural equality for object values. Instead, `===` uses identity equality for object values. JS doesn’t provide structural equality comparison because it’s almost intractable to handle all the corner cases!

#### #Coercive Comparisons

- Coercion means a value of one type being converted to its respective representation in another type (to whatever extent possible).
- There are minor differences between `==` and `===`.
  - Both consider the _value type_.
  - If the _value type_ are the same, the comparsion works.
  - If the _value type_ is different, `==` allows the type conversion **_before_** the comparsion.
  - Instead of “loose equality,” the `==` operator should be described as “coercive equality.”

```jsx
42 == "42"; // true
1 == true; // true
```

In both comparisons, the value types are different, so the `==` causes the non-number values ("42" and true) to be converted to numbers (42 and 1, respectively) before the comparisons are made.

```jsx
var x = "10";
var y = "9";
x < y; // true, watch out!
```

Can we "fix" it with

```jsx
var x = "10" * 1;
var y = "9" * 1;
x < y; // false
```

?

- The wiser approach is **_not to avoid_** coercive comparisons, but to embrace and **_learn_** their ins and outs.
  ###How We Organize in JS
  Two major patterns for organizing code (data and behavior) are used broadly across the JS ecosystem: classes and modules. These patterns are not mutually exclusive; many programs can and do use both. Other programs will stick with just one pattern, or even neither! Being proficient in JS requires understanding both patterns and where they are appropriate (and not!).

#### Classes

- A class in a program is a definition of a “type” of custom data structure that includes both data and behaviors that operate on that data. Classes define how such a data structure works, but classes are not themselves concrete values. To get a concrete value that you can use in the program, a class must be instantiated (with the new keyword) one or more times.

#### Class Inheritance

- Inheritance is a major feature of object-oriented programming. Data abstraction can be carried up several levels, that is, classes can have superclasses and subclasses.
- JavaScript does **_not_** support multiple inheritance.
- Inheritance is a powerful tool for organizing data/behavior in separate logical units (classes), but allowing the child class to cooperate with the parent by accessing/using its behavior and data.

```jsx
/// Parent-class
class Publication {
  // The constructor method is a special method for creating
  // and initializing an object created with a class.
  // There can only be one constructor (like he Highlander ;))
  constructor(title, author, pubDate) {
    this.title = title;
    this.author = author;
    this.pubDate = pubDate;
  }
  // This is the "behavior" (the method)
  print() {
    console.log(`
                Title: ${this.title} 
                By: ${this.author} 
                ${this.pubDate}
            `);
  }
}

// Child-class
class Book extends Publication {
  constructor(bookDetails) {
    // The super keyword is used to access and call functions on an object's parent.
    super(bookDetails.title, bookDetails.author, bookDetails.publishedOn);
    this.publisher = bookDetails.publisher;
    this.ISBN = bookDetails.ISBN;
  }
  print() {
    super.print();
    console.log(`    
                Publisher: ${this.publisher}
                ISBN: ${this.ISBN} 
            `);
  }
}

// Child-class
class BlogPost extends Publication {
  constructor(title, author, pubDate, URL) {
    super(title, author, pubDate);
    this.URL = URL;
  }
  print() {
    super.print();
    console.log(this.URL);
  }
}
```

```jsx
var YDKJS = new Book({
  title: "You Don't Know JS",
  author: "Kyle Simpson",
  publishedOn: "June 2014",
  publisher: "O'Reilly",
  ISBN: "123456-789",
});
YDKJS.print();
// Title: You Don't Know JS
// By: Kyle Simpson
// June 2014
// Publisher: O'Reilly
// ISBN: 123456-789

var forAgainstLet = new BlogPost(
  "For and against let",
  "Kyle Simpson",
  "October 27, 2014",
  "https://davidwalsh.name/for-and-against-let"
);
forAgainstLet.print();
// Title: For and against let
// By: Kyle Simpson
// October 27, 2014
// https://davidwalsh.name/for-and-against-let
```

- Notice that both child class instances have a print() method, which was an override of the inherited print() method from the parent Publication class. Each of those overridden child class print() methods call super.print() to invoke the inherited version of the print() method.
- The fact that both the inherited and overridden methods can have the same name and co-exist is called **_polymorphism_**.

#### Modules

- The module pattern has essentially the same goal as the class pattern, which is to group data and behavior together into logical units, but with some important differences from classes. Most notably, the syntax is entirely different.

#### Classic Modules

- Classic modules are an outer function (that runs at least once), which returns an “instance” of the module with one or more functions exposed that can operate on the module instance’s internal (hidden) data.
- Because a module of this form is just a function, and calling it produces an “instance” of the module, another description for these functions is “module factories”.

```jsx
function Publication(title, author, pubDate) {
  var publicAPI = {
    print() {
      console.log(`
                    Title: ${title} 
                    By: ${author} 
                    ${pubDate}
                `);
    },
  };
  return publicAPI;
}

function Book(bookDetails) {
  var pub = Publication(
    bookDetails.title,
    bookDetails.author,
    bookDetails.publishedOn
  );
  var publicAPI = {
    print() {
      pub.print();
      console.log(`
                    Publisher: ${bookDetails.publisher}
                    ISBN: ${bookDetails.ISBN} 
                `);
    },
  };
  return publicAPI;
}

function BlogPost(title, author, pubDate, URL) {
  var pub = Publication(title, author, pubDate);
  var publicAPI = {
    print() {
      pub.print();
      console.log(URL);
    },
  };
  return publicAPI;
}
```

- The _class form_ stores methods and data on an object instance, which must be accessed with the `this.` prefix. With _modules_, the methods and data are accessed as _identifier variables in scope_, without any `this.` prefix.

#### ES Modules

- _ES modules (ESM)_, introduced to the JS language in ES6, are meant to serve much the same spirit and purpose as the existing _classic modules_.
- There’s no wrapping function to define a module.
- ESMs are always file-based; one file, one module.
- You don’t interact with a module’s “API” explicitly, but rather use the export keyword to add a variable or method to its public API definition.
- _You don’t “instantiate” an ES module_, you just import it to use its single instance. ESMs are, in effect, **_“singletons_**,” in that there’s only one instance ever created, at first import in your program, and all other imports just receive a reference to that same single instance.
- If your module needs to support multiple instantiations, you have to provide a classic module-style factory function on your ESM definition for that purpose.

```jsx
function printDetails(title, author, pubDate) {
  console.log(`
            Title: ${title} 
            By: ${author} 
            ${pubDate}
        `);
}

export function create(title, author, pubDate) {
  var publicAPI = {
    print() {
      printDetails(title, author, pubDate);
    },
  };
  return publicAPI;
}
```

To import and use this module, from another ES module like blogpost.js:

```jsx
import { create as createPub } from "publication.js";

function printDetails(pub, URL) {
  pub.print();
  console.log(URL);
}

export function create(title, author, pubDate, URL) {
  var pub = createPub(title, author, pubDate);
  var publicAPI = {
    print() {
      printDetails(pub, URL);
    },
  };
  return publicAPI;
}
```

And finally, to use this module, we import into another ES module like main.js:

```jsx
import { create as newBlogPost } from "blogpost.js";
var forAgainstLet = newBlogPost(
  "For and against let",
  "Kyle Simpson",
  "October 27, 2014",
  "https://davidwalsh.name/for-and-against-let"
);
forAgainstLet.print();
// Title: For and against let
// By: Kyle Simpson
// October 27, 2014
// https://davidwalsh.name/for-and-against-let
```
