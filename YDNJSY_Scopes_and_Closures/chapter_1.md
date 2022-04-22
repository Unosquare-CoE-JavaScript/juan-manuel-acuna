# Chapter 1: What's the Scope?

Scope is a collection of a _very_ well defined and structued rules that allow JS (and to us) to know which variables exists and what are their values.

JS functions are themselves first-class values, but, since the functions can hold and access variables, their maintain their original scope no matter where are eventually executed. This is _Closure_

#### Compiled vs. Interpreted

- Code compilation is a set of steps that process the text of your code and turn it into a list of instructions the computer can understand.
- Code interpretation have a different process; source code is transformed into a machine-understandable instruction, and executed, before proceeding to the next line of code.

#### Compiling Code

**_JS is compiled_** and scope is primarily determined during compilation.
Compilation has three basic stages:

1. **Tokenizing/Lexing**: breaking up a string of characters int a meaningful chunks, called tokens. For instance, in `var a = 2;` the chunks will be `var`, `a`, `=`, `2` and `;`
2. **Parsing**: Taking a stream of tokens and turning it into a tree of nested elements, which collectively represent the grammatical structure of the program. This is called an Abstract Syntax Tree (AST).
3. **Code generation**: turning a AST into executable code.

##### Syntax errors from the start

```jsx
var greeting = "Hello";
console.log(greeting);
greeting = ."Hi";
// SyntaxError: unexpected token . <-- Now, I understand the "unexpected token" message!
```

This program produces no output ("Hello" is not printed). The third line (like as all others) is breaked into _tokens_ `greeting`, `=`, `.`, `"Hi"` and `;`, and the compiler is complains about the third token `.`. This behavior occurs because JS engine first parsing _the entire program_ before execute it.

##### Early errors

```jsx
console.log("Howdy");
saySomething("Hello", "Hi");
// Uncaught SyntaxError: Duplicate parameter name not
// allowed in this context
function saySomething(greeting, greeting) {
  "use strict";
  console.log(greeting);
}
```

The "Howdy" message is not printed, despite being a well-formed statement. That's because the "use strict" pragma, that doesn't allow duplicate parameter names in a single function. Now, the "use strict" pragma comes after the definition of the function, how the compiler knows about this error? Because the compiler parse _the entire program_ before execute it.

##### Hoisting

```jsx
function saySomething() {
  var greeting = "Hello";
  {
    greeting = "Howdy"; // error comes from here
    let greeting = "Hi";
    console.log(greeting);
  }
}
saySomething();
// ReferenceError: Cannot access 'greeting' before
// initialization
```

The noted ReferenceError occurs from the line with the statement greeting = "Howdy". What’s happening is that the greeting variable for that statement belongs to the declaration on the next line, let greeting = "Hi", rather than to the previous var greeting = "Hello" statement. That occurs because the compiler parse _the entire program_ before execute it.

#### Compiler Speak

```jsx
var students = [
  { id: 14, name: "Kyle" },
  { id: 73, name: "Suzy" },
  { id: 112, name: "Frank" },
  { id: 6, name: "Sarah" },
];
function getStudentName(studentID) {
  for (let student of students) {
    if (student.id == studentID) {
      return student.name;
    }
  }
}
var nextStudent = getStudentName(73);
console.log(nextStudent);
// Suzy
```

There are two roles:

- the target of an assignment (aka LHS, Left-hand-side, _target_)
- the source of a value (aka RHS, right-hand-side, _source_)

How do you know if a variable is a target? Check if there is a value that is being assigned to it; if so, it’s a **_target_**. If not, then the variable is a **_source_**.

##### Target examples:

```jsx
var students = [ ... // <-- A very clear assignment
```

```jsx
for (let student of students) { // <-- The assignment here is on "student" on each iteration
```

```jsx
getStudentName(73); // <-- The assignment here is 73 on "studentID"
```

```jsx
function getStudentName(studentID) { // <-- This one is hard to identify.
```

An identifier getStudentName is declared (at compile time), but the = function(studentID) part is also handled at compilation; the association between getStudentName and the function is automatically set up at the beginning of the scope rather than waiting for an = assignment statement to be executed.

This automatic association of function and vari- able is referred to as “function hoisting”.

##### Source examples:

```jsx
for (let student of students) { // <-- The source is students
```

```jsx
if (student.id == studentID) { // <-- In this line, both variables are sources
```

```jsx
return student.name; // <-- The source is student
```

```jsx
getStudentName(73) { // <-- The source is getStudentName
```

```jsx
var nextStudent = getStudentName(73); // <-- The source is getStudentName
```

```jsx
console.log(nextStudent); // <-- console is a source reference, as is nextStudent.
```

**Important**: `id`, `name` and `log` are _properties_, not variable references.

#### Cheating: Runtime Scope Modifications

It's dangerous to modify the scope on runtime. Should not be done. But, just in case we found some of this, we need to know what are we facing.

The `eval(..)` function receives a string of code to compile and execute on the fly during the program runtime. If that string of code has a var or function declaration in it, those declarations will modify the current scope that the `eval(..)` is currently executing it:

```jsx
function badIdea() {
  eval("var oops = 'Ugh!';");
  console.log(oops);
}
badIdea(); // Ugh!
```

The second cheat is the with keyword, which essentially dynamically turns an object into a local scopeits properties are treated as identifiers in that new scope’s block:

```jsx
var badIdea = { oops: "Ugh!" };
with (badIdea) {
  console.log(oops); // Ugh!
}
```

Neither of these cheats is available in strict-mode.

#### Lexical Scope

The key idea of “lexical scope” is that it’s controlled entirely by the placement of functions, blocks, and variable declarations, in relation to one another.
Compilation creates a map of all the lexical scopes that lays out what the program will need while it executes. While scopes are identified during compila- tion, they’re not actually created until runtime, each time a scope needs to run.
