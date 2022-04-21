import {
	createStore,
	compose,
	applyMiddleware,
	bindActionCreators,
	combineReducers,
} from "redux";

// const initialState = {
// 	users: [
// 		{ id: 1, name: "Juan" },
// 		{ id: 2, name: "Steve" },
// 	],
// 	tasks: [
// 		{ title: "File the TPS reports" },
// 		{ title: "Order more energy drinks" },
// 	],
// };

/**
 * ***********************************************
 * initialStates file
 * ***********************************************
 */
const users = [
	{ id: 1, name: "Juan" },
	{ id: 2, name: "Steve" },
];

const tasks = [
	{ title: "File the TPS reports" },
	{ title: "Order more energy drinks" },
];

const foods = [
	{ food: "pizza" },
	{ food: "tacos" },
	{ food: "cereal" },
	{ food: "hamburguers" },
];

const initialState = { users, tasks, foods };

/**
 * ***********************************************
 * constants file
 * ***********************************************
 */
const ADD_USER = "ADD_USER";
const ADD_TASK = "ADD_TASK";
const ADD_FOOD = "ADD_FOOD";

/**
 * ***********************************************
 * reducers file
 * ***********************************************
 */
const addTask = (title) => ({ type: ADD_TASK, payload: title });
const addUser = (name) => ({ type: ADD_USER, payload: name });
const addFood = (food) => ({ type: ADD_FOOD, payload: food });

const userReducer = (users = initialState.users, action) => {
	switch (action.type) {
		case ADD_USER:
			return [...users, action.payload];
		default:
			return users;
	}
};

const tasksReducer = (tasks = initialState.tasks, action) => {
	switch (action.type) {
		case ADD_TASK:
			return [...tasks, action.payload];
		default:
			return tasks;
	}
};

const foodsReducer = (foods = initialState.foods, action) => {
	switch (action.type) {
		case ADD_FOOD:
			return [...foods, action.payload];
		default:
			return foods;
	}
};

const reducer = combineReducers({
	users: userReducer,
	tasks: tasksReducer,
	foods: foodsReducer,
});

/**
 * ***********************************************
 * store file
 * ***********************************************
 */
const store = createStore(reducer);

const actions = bindActionCreators(
	{ addTask, addUser, addFood },
	store.dispatch
);

/**
 * import the store file (which contails all the other files)
 * and start using all over the place
 */
actions.addTask({ title: "I am amazing!" });
actions.addFood({ food: "eggs" });
actions.addUser({ id: 3, name: "George" });

console.log(store.getState());
