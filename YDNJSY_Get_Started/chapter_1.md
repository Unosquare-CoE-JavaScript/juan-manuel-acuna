# Chapter 1

- JavaScript name was a marketing ploy to try to position this language as a palatable alternative to writing the heavier and more well-known Java of the day.

#### Language Specification

- The official name of the language specified by TC39 and formalized by the ECMA standards body is ECMAScript. And indeed, since 2016, the official language name has also been suffixed by the revision year; as of this writing, that’s ECMAScript 2019, or otherwise abbreviated ES2019.
- TC39 is the technical steering committee that manages JS. Their primary task is managing the official specification for the language. They meet regularly to vote on any agreed changes, which they then submit to ECMA, the standards organization.
- ES2019 happens to be the 10th major numbered specifica- tion/revision since JS’s inception in 1995, so in the specifica- tion’s official URL as hosted by ECMA, you’ll find “10.0”: https://www.ecma-international.org/ecma-262/10.0/
- There are not multiple versions of JavaScript in the wild. There’s just one JS, the official standard as maintained by TC39 and ECMA. That means you can learn one JS, and rely on that same JS everywhere.

#### The Web Rules

- There is an Appendix B, “Additional ECMAScript Features for Web Browsers”.1 The JS specification includes this appendix to detail out any known mismatches between the official JS specification and the reality of JS on the web. In other words, these are exceptions that are allowed ONLY for web JS; other JS environments _must stick_ to the letter of the law.

#### Not All (Web) JS...

- A wide range of JS-looking APIs, like `fetch(..)`, `getCurrentLocation(..)`, and `getUserMedia(..)`, are all web APIs that look like JS. In Node.js, we can access hun- dreds of API methods from various built-in modules, like `fs.write(..)`.

#### It’s Not Always JS

- The developer console is not trying to pretend to be a JS compiler that handles your entered code exactly the same way the JS engine handles a .js file. It’s trying to make it easy for you to quickly enter a few lines of code and see the results immediately. Don’t trust what behavior you see in a developer console as representing exact to-the-letter JS semantics; for that, read the specification. Instead, think of the console as a “JS-friendly” environment.

#### Paradigms (many faces)

- The term **“paradigm”** in programming language context refers to a broad (almost universal) mindset and approach to struc- turing code.
- Typical paradigm-level code categories include procedural, object-oriented (OO/classes), and functional (FP):
  - <ins>Procedural style</ins> organizes code in a top-down, linear progression through a pre-determined set of operations, usually collected together in related units called procedures.
  - <ins>Object Oriented (OO) style</ins> organizes code by collecting logic and data together into units called classes.
  - <ins>Functional paradigm (FP) style</ins> organizes code into functions (pure computations as opposed to procedures), and the adaptations of those functions as values.
- JavaScript is most definitely a multi-paradigm language (yeah!). You can write procedural, class-oriented, or FP-style code, and you can make those decisions on a line-by-line basis instead of being forced into an all-or-nothing choice.

#### Backwards & Forwards

- One of the most foundational principles that guides JavaScript is preservation of _backwards compatibility_. It means that once something is accepted as valid JS, there will not be a future change to the language that causes that code to become invalid JS.
- By another hand, JS is **_not_** forwards-compatible.

#### Jumping the Gaps

- There is a solution for the not forwards-compatible problem: transpiling, it's using a tool to convert the source code of a program from one form to another (but still as textual source code).

  ```jsx
  // old snipped code
  if (something) {
    let x = 3;
    console.log(x);
  } else {
    let x = 4;
    console.log(x);
  }

  // babel transpile code
  var x$0, x$1;

  if (something) {
    x$0 = 3;
    console.log(x$0);
  } else {
    x$1 = 4;
    console.log(x$1);
  }
  ```

#### Filling the Gaps

- What happens where the problem is not a gap, but a missing API / specification / method? Babel also can handle it. The most common solution is to provide a definition for that missing API method that stands in and acts as if the older environment had already had it natively defined. This pattern is called a **_polyfill_** (aka “shim”).

  ```jsx
  // getSomeRecords() returns us a promise for some
  // data it will fetch
  var pr = getSomeRecords();
  // show the UI spinner while we get the data
  startSpinner();
  pr.then(renderRecords) // render if successful
    .catch(showError) // show an error if not
    .finally(hideSpinner); // always hide the spinner
  ```

  ```jsx
  // getSomeRecords() returns us a promise for some
  // data it will fetch
  var pr = getSomeRecords();
  // show the UI spinner while we get the data
  startSpinner();
  pr.then(renderRecords) // render if successful
    .catch(showError) // show an error if not
    .finally(hideSpinner); // always hide the spinner
  ```

  This code uses an ES2019 feature, the finally(..) method on the promise prototype. If this code were used in a pre- ES2019 environment, the finally(..) method would not exist, and an error would occur.

  ```jsx
  if (!Promise.prototype.finally) {
      Promise.prototype.finally = function f(fn){
          return this.then( function t(v){
              return Promise.resolve( fn() )
                  .then(function t(){
                      return v;
                  });
          },
          function c(e){
              return Promise.resolve( fn() )
                  .then(function t(){
                      throw e;
                  });
          }
      );
  }
  ```

  Transpilation and polyfilling are two highly effective tech- niques for addressing that gap between code that uses the latest stable features in the language and the old environments a site or application needs to still support.

#### What’s in an Interpretation?

- Is JS an interpreted script or a compiled program? JS source code is parsed before it is executed. The specification requires as much, because it calls for “early errors” —statically determined errors in code, such as a duplicate parameter name— to be reported before the code starts executing. Those errors cannot be recognized without the code having been parsed. So JS is a parsed language, but is it compiled? The answer is closer to yes than no. The parsed JS is converted to an optimized (binary) form, and that “code” is subsequently executed

The entire flow of a JS source program:

1. After a program leaves a developer’s editor, it gets tranpiled by Babel, then packed by Webpack (and perhaps half a dozen other build processes), then it gets delivered in that very different form to a JS engine.
2. The JS engine parses the code to an AST (Abstract Syntax Tree).
3. Then the engine converts that AST to a kind-of byte
   code, a binary intermediate representation (IR), which is then refined/converted even further by the optimizing JIT (Just In Time) compiler.
4. Finally, the JS VM executes the program.
   I think it’s clear that in spirit, if not in practice, **_JS is a compiled language_**.

#### Web Assembly (WASM)

- WASM is a representation format more akin to Assembly (hence, its name) that can be processed by a JS engine by skipping the parsing/compilation that the JS engine normally does. The parsing/compilation of a WASM-targeted program happen ahead of time (AOT); what’s distributed is a binary- packed program ready for the JS engine to execute with very minimal processing.
- An initial motivation for WASM was clearly the potential per- formance improvements. While that continues to be a focus, WASM is additionally motivated by the desire to bring more parity for non-JS languages to the web platform. For example, if a language like Go supports threaded programming, but JS (the language) does not, WASM offers the potential for such a Go program to be converted to a form the JS engine can understand, without needing a threads feature in the JS language itself.
- WASM will **not** replace JS. WASM significantly augments what the web (including JS) can accomplish.

#### _Strictly_ Speaking

- Why strict mode? Strict mode shouldn’t be thought of as a restriction on what you can’t do, but rather as a guide to the best way to do things so that the JS engine has the best chance of optimizing and efficiently running the code.
- Most strict mode controls are in the form of early errors, meaning errors that aren’t strictly syntax errors but are still thrown at compile time (before the code is run). For example, strict mode disallows naming two function parameters the same, and results in an early error. Some other strict mode controls are only observable at runtime, such as how this defaults to undefined instead of the global object.
- Strict mode is switched on per file with a special pragma (nothing allowed before it except comments/whitespace):
  ```jsx
  // only whitespace and comments are allowed
  // before the use-strict pragma
  "use strict";
  // the rest of the file runs in strict mode
  ```
- Strict mode can alternatively be turned on per-function scope, with exactly the same rules about its surroundings:
  ```jsx
  function someOperations() {
    // whitespace and comments are fine here
    "use strict";
    // all this code will run in strict mode
  }
  ```
  The **_only_** valid reason to use a per-function approach to strict mode is when you are converting an existing non-strict mode program file and need to make the changes little by little over time. Otherwise, it’s vastly better to simply turn strict mode on for the entire file/program.

#### Defined

- JS is an implementation of the ECMAScript standard (version ES2019 as of this writing), which is guided by the TC39 committee and hosted by ECMA. It runs in browsers and other JS environments such as Node.js.
- JS is a multi-paradigm language, meaning the syntax and capabilities allow a developer to mix and match (and bend and reshape!) concepts from various major paradigms, such as procedural, object-oriented (OO/classes), and functional (FP).
- JS is a compiled language, meaning the tools (including the JS engine) process and verify a program (reporting any errors!) before it executes.
