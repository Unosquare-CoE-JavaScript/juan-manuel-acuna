import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators,
  combineReducers,
} from "redux";

const reducer = (state = { count: 1 }) => state;

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

const logEnhancer = (createStore) => (reducer, initialState, enhancer) => {
  const logReducer = (state, action) => {
    console.log("old state: ", state, action);
    const newState = reducer(state, action);
    console.log("new state: ", newState, action);
    return newState;
  };
  return createStore(logReducer, initialState, enhancer);
};

const logMiddleware = (store) => (next) => (action) => {
  console.log("old state ", store.getState(), action);
  next(action);
  console.log("new state ", store.getState(), action);
};

const monitorMiddleware = (store) => (next) => (action) => {
  // The snack! (state, next, action)
  const start = performance.now();
  next(action);
  const end = performance.now();
  const diff = end - start;
  console.log("diff:", diff);
};

const store = createStore(
  reducer,
  applyMiddleware(logMiddleware, monitorMiddleware)
);

store.dispatch({ type: "Hello" });
