import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators,
  combineReducers,
} from "redux";

const initialState = {
  users: [
    { id: 1, name: "Steve" },
    { id: 2, name: "Erick" },
  ],
  tasks: [
    { title: "File the TPS reports" },
    { title: "Order more energy drings" },
  ],
};

const ADD_USER = "ADD_USER";
const ADD_TASK = "ADD_TASK";

const addTask = (title) => ({ type: ADD_TASK, payload: title });
const addUser = (name) => ({ type: ADD_USER, payload: name });

// Before refactor, large (and potentially) complex reducer.
/*
const reducer = (state = initialState, action) => {
  if (action.type === ADD_USER) {
    return {
      ...state,
      users: [...state.users, action.payload],
    };
  }
  if (action.type === ADD_TASK) {
    return {
      ...state,
      tasks: [...state.tasks, action.payload],
    };
  }
  return state;
};
*/

// After refactor, using combineReducers, we can get a simpler code
const userRedeucer = (users = initialState.users, action) => {
  if (action.type === ADD_USER) {
    return [...users, action.payload];
  }
  return users;
};

const tasksReducer = (tasks = initialState.tasks, action) => {
  if (action.type === ADD_TASK) {
    return [...tasks, action.payload];
  }
  return tasks;
};

const reducer = combineReducers({
  users: userRedeucer,
  tasks: tasksReducer,
});

const store = createStore(reducer);

console.log(store.getState());
