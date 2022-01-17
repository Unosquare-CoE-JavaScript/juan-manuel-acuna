#Appendix A: Exploring Further

####Values vs. References
- In many languages, the developer can choose between assign- ing/passing a value as the value itself, or as a reference to the value. In JS, however, this decision is entirely determined by the kind of value.
```jsx
    var myName = "Kyle";
    var yourName = myName;
    myName = "Frank";

    console.log(myName);
    // Frank

    console.log(yourName);
    // Kyle
```
The `yourName` variable has a separate copy of the "Kyle" string from the value that’s stored in myName. That’s because the value is a primitive, and primitive values are always assigned/passed as ***value copies***.

- References are the idea that two or more variables are pointing at the *same value*, such that modifying this shared value would be reflected by an access via any of those references. 
- In JS, only object values (arrays, objects, functions, etc.) are treated as references.

```jsx
    var myAddress = {
        street: "123 JS Blvd", 
        city: "Austin", 
        state: "TX"
    };
    var yourAddress = myAddress;

    // I've got to move to a new house!
    myAddress.street = "456 TS Ave";

    console.log(yourAddress.street);
    // 456 TS Ave
    // 

```
Note than we haven't modified `yourAdress`, but `myAdress`, but both pointing to the same address memory location. The assignment to the `yourAddress` variable is a copy of the reference, not the object value itself.
- Again, JS chooses the value-copy vs. reference-copy behavior *based on the value type*. Primitives are held *by value*, objects are held *by reference*. There’s no way to override this in JS, in either direction.

####So Many Function Forms
```jsx
    var awesomeFunction = function(coolThings) { 
        // ..
        return amazingStuff; 
    };
```
This is an anonymous function expression, since it has no name identifier between the `function` keyword and the `(..)` parameter list.

```jsx
    // As of ES6, JS performs a “name inference” on an anonymous function:
    awesomeFunction.name;
    // "awesomeFunction"
```
- The name property of a function will reveal either its directly given name (in the case of a declaration) or its inferred name in the case of an anonymous function expression.
- Name inference only happens in limited cases such as when the function expression is assigned (with =). If you pass a function expression as an argument to a function call, for example, no name inference occurs; the name property will be an empty string, and the developer console will usually report “(anonymous function)”.
```jsx
    // let awesomeFunction = ..
    // const awesomeFunction = ..
    var awesomeFunction = function someName(coolThings) {
        // ..
        return amazingStuff; 
    };

    awesomeFunction.name;
    // "someName"
    // This is a "named function"
```
Here are some more declaration forms:
```jsx
    // generator function declaration
    function *two() { .. }

    // async function declaration
    async function three() { .. }

    // async generator function declaration
    async function *four() { .. }

    // named function export declaration (ES6 modules)
    export function five() { .. }
```
And here are some more of the (many!) function expression forms:
```jsx
    // IIFE
    (function(){ .. })(); 
    (function namedIIFE(){ .. })();

    // asynchronous IIFE
    (async function(){ .. })();
    (async function namedAIIFE(){ .. })();

    // arrow function expressions
    var f;
    f = () => 42;
    f = x => x * 2;
    f = (x) => x * 2;
    f = (x,y) => x * y;
    f = x => ({ x: x * 2 });
    f = x => { return x * 2; }; 
    f = async x => {
        var y = await doSomethingAsync(x);
        return y * 2; 
    };
    someOperation( x => x * 2 );
    // ..
```
- Arrow function expressions are syntactically anonymous, meaning the syntax doesn’t provide a way to provide a direct name identifier for the function.

####Coercive Conditional Comparison
- Every comparsion in JS make a coersion before the comparsion itself. It's very important to have this in mind when we use any kind of comparsion.
```jsx
    var x = "hello";

    if (Boolean(x) == true) { 
        // will run
    }
    
    // which is the same as:
    if (Boolean(x) === true) { 
        // will run
    }
```
`Boolean(..)` ***always*** return a value of type boolean, in this case, `x` is not empty, so, for `Boolean(..)` it's true...

####Prototypal “Classes”
```jsx
    // Prototype chain example
    var Classroom = { 
        welcome() {
            console.log("Welcome, students!");
        }
    };

    var mathClass = Object.create(Classroom);

    mathClass.welcome();
    // Welcome, students!
```
Here, a `mathClass` object is linked via its prototype to a `Classroom` object. Through this linkage, the function call `mathClass.welcome()` is delegated to the method defined on `Classroom`.

```jsx
    // Prototypal class example (strongly discouraged!!!)
    function Classroom() { 
        // ..
    }
    Classroom.prototype.welcome = function hello() { 
        console.log("Welcome, students!");
    };

    var mathClass = new Classroom();
    mathClass.welcome();
    // Welcome, students!
```
```jsx
    // ES6’s class mechanism (recomended)
    // Much more undestandable, if we use classes
    class Classroom { 
        constructor() {
        // ..
        }

        welcome() {
            console.log("Welcome, students!");
        } 
    }

    var mathClass = new Classroom(); 
    mathClass.welcome();
    // Welcome, students!
```