import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators,
  combineReducers,
} from "redux";

const reducer = (state) => state;

const monitorEnhancer = (createStore) => (reducer, initialState, enhancer) => {
  const monitorReducer = (state, action) => {
    const start = performance.now();
    const newState = reducer(state, action);
    const end = performance.now();
    const diff = end - start;
    console.log("diff:", diff);
    return newState;
  };
  return createStore(monitorReducer, initialState, enhancer);
};

const store = createStore(reducer, monitorEnhancer);

store.dispatch({ type: "Hello" });
