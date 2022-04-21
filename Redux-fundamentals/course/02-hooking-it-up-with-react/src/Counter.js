// import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";
// import { decrement, increment, set } from "./actions";
import { SetCounter } from "./SetCounter";
import { useCounter } from "./use-counter";

export const Counter = () => {
	const incident = "Incident";
	// const count = useSelector((state) => state.count);

	const { count, increment, decrement, set } = useCounter();

	// const dispatch = useDispatch();

	// useSelector is the replacement to mapStateToProps
	// useDispatch is the replacement to mapDispatchToProps

	return (
		<main className="Counter">
			<h1>Days Since Last {incident}</h1>
			<p className="count">{count}</p>
			<section className="controls">
				<button onClick={() => increment()}>Increment</button>
				<button onClick={() => set(50)}>Reset</button>
				<button onClick={() => decrement()}>Decrement</button>
			</section>
			<SetCounter />
		</main>
	);
};

export default Counter;
