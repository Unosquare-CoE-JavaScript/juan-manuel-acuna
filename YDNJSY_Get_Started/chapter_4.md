# Chapter 4

##The Bigger Picture

- This final chapter divides the organization of the JS language into three main pillars:
  - Scope and Closure.
  - Prototypes
  - Types and Coercion

### Pillar 1: Scope and Closure

The organization of variables into units of scope (functions, blocks) is one of the most foundational characteristics of any language; perhaps no other characteristic has a greater impact on how programs behave.
Scopes are like buckets, and variables are like marbles you put into those buckets.
This is how scopes behave in most languages, which is called lexical scope. The scope unit boundaries, and how variables are organized in them, is determined at the time the program is parsed (compiled).
In other words, it’s an author-time decision: where you locate a function/scope in the program determines what the scope structure of that part of the pro- gram will be.
**_JS is lexically scoped_**, though many claim it isn’t, because of two particular characteristics of its model that are not present in other lexically scoped languages.

- The first is commonly called hoisting: when all variables declared anywhere in a scope are treated as if they’re declared at the beginning of the scope. (I knew the behavior, but not the name!!!).
- The other is that var-declared variables are function scoped, even if they appear inside a block.

Neither hoisting nor function-scoped var are sufficient to back the claim that JS is not lexically scoped. let/const declarations have a peculiar error behavior called the _“Temporal Dead Zone” (TDZ)_ which results in observable but unusable variables. Though TDZ can be strange to encounter, it’s also not an invalidation of lexical scoping. All of these are just unique parts of the language that should be learned and understood by all JS developers. (Note, I need to understand this _deeply_)

### Pillar 2: Prototypes

The second pillar of the language is the prototypes system (a characteristic of an object, and specifically resolution of a property access, remember?).

- _Behavior delegation_: simply embrace objects as objects, forget classes altogether, and let objects cooperate through the prototype chain.
- Classes aren’t the only way to use objects (need to check on Book 3, Objects & Classes).

### Pillar 3: Types and Coercion

The vast majority of developers have strong misconceptions about how types work in programming languages, and espe- cially how they work in JS. A tidal wave of interest in the broader JS community has begun to shift to “static typing” approaches, using type-aware tooling like TypeScript or Flow.
I agree that JS developers should learn more about types, and should learn more about how JS manages type conversions. I also agree that type-aware tooling can help developers, assuming they have gained and used this knowledge in the first place!
