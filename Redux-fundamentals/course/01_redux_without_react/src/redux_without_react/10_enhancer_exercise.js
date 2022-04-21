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
		console.log("old state: ", state, "type:", action.type);
		const newState = reducer(state, action);
		console.log("new state: ", newState, "type:", action.type);
		return newState;
	};
	return createStore(logReducer, initialState, enhancer);
};

const store = createStore(reducer, compose(logEnhancer, monitorEnhancer));

store.dispatch({ type: "Hello" });