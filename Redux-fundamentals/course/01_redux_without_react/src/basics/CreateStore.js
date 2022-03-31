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
  type: INCREMENT,
  payload: amount,
});

const reducer = (state, action) => {
  if (action.type === INCREMENT) {
    return { value: state.value + 1 };
  }

  if (action.type === ADD) {
    return { value: state.value + action.payload };
  }

  return state;
};

const store = createStore(reducer);

console.log(store);
