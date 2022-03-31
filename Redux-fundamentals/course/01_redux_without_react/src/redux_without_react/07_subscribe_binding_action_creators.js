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
  type: INCREMENT,
};

const increment = () => ({ type: INCREMENT });
const add = (amount) => ({ type: ADD, payload: amount });

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

const actions = bindActionCreators({ increment, add }, store.dispatch);

actions.add(1000);
actions.increment();

console.log(store.getState());
