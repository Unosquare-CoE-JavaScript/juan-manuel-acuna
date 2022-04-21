<h1 align='center'>Center of Excellence (CoE): JS</h1>
<h2 align='center'>Juan Manuel Acuña</h2>
<h3 align='center'>Think twice, code once</h3>

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/4/49/Redux.png" width="200" />
</p>

<h3 align='center'>Redux Fundamentals</h3>
<h4 align='center'>By: Steve Kinney</h4>
<h4 align='center'>https://frontendmasters.com/courses/redux-fundamentals/</h4>

## Index

### Redux without React

##### [Redux API's & Compose](https://github.com/Unosquare-CoE-JavaScript/juan-manuel-acuna/tree/master/)

##### [Redux Stores & Reducers](https://github.com/Unosquare-CoE-JavaScript/juan-manuel-acuna/tree/master/)

##### [Redux Stores & Dispatch](https://github.com/Unosquare-CoE-JavaScript/juan-manuel-acuna/tree/master/)

##### [Action Creators](https://github.com/Unosquare-CoE-JavaScript/juan-manuel-acuna/tree/master/)

##### [Settings Initial State](https://github.com/Unosquare-CoE-JavaScript/juan-manuel-acuna/tree/master/)

##### [Subscribe & Binding Action Creators](https://github.com/Unosquare-CoE-JavaScript/juan-manuel-acuna/tree/master/)

##### [Combine Reducers](https://github.com/Unosquare-CoE-JavaScript/juan-manuel-acuna/tree/master/)

##### [Enhancers](https://github.com/Unosquare-CoE-JavaScript/juan-manuel-acuna/tree/master/)

##### [Enhancers exercise](https://github.com/Unosquare-CoE-JavaScript/juan-manuel-acuna/tree/master/)

##### [Middleware](https://github.com/Unosquare-CoE-JavaScript/juan-manuel-acuna/tree/master/)

### Some important notes

#### It´s relatively small

It has 5 (formal) methods ... but the "_createStore_" method has also 4 more, so, really there are 9 methods.

- applyMiddleware
- compose
- combineReducers
- bindActionCreators
- createStore

### Some rules for Reducers

##### Disobey at your own peril

- No mutating objects. If you touch it, you replace it.
- You have to return _something_ and ideally, it should be the uchanged state if there is nothing you need to do it.
- It's just a JavaScript function.

**_It's an anti pattern to have multiple stores (but we might split up into many reducers)._** **So, don't do that.**
