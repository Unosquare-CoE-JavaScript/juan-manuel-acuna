// import React from "react";

import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators,
} from "redux";

const initialState = { value: 0 };

const INCREMENT = "INCREMENT";
const ADD = "ADD";

const incrementAction = {
  // The ONLY thing that an 'action' REALLY need is a type. Without a type, it doesn't work.
  type: INCREMENT,
  payload: 5,
};

const increment = () => ({
  type: INCREMENT,
});
const add = (amount) => ({
  type: ADD,
  payload: amount,
});

const reducer = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    const value = state.value + 1;
    return { value };
  }

  if (action.type === ADD) {
    return { value: state.value + action.payload };
  }

  return state;
};

const store = createStore(reducer);

const subscriber = () => console.log("SUBSCRIBER", store.getState());

// store.subscribe(subscriber);

const actions = bindActionCreators(
  {
    increment,
    add,
  },
  store.dispatch
);

console.log(actions);

actions.add(100);
console.log(store.getState());
actions.increment();
console.log(store.getState());

// store.dispatch(increment());
// store.dispatch(increment());
// store.dispatch(increment());
// store.dispatch(add(1000));
