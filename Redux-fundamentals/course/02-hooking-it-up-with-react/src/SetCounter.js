import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "react-redux";
import { set } from "./actions";
import { useActions } from "./use-actions";

export const SetCounter = () => {
	const countFromStore = useSelector((state) => state.count);
	const [count, setCount] = useState(countFromStore);
	// const dispatch = useDispatch();
	const actions = useActions({ set });

	useEffect(() => {
		setCount(countFromStore);
	}, [countFromStore]);

	// console.log("count", count);
	// console.log("countFromStore", countFromStore);
	return (
		<section className="controls">
			<form
				onSubmit={(event) => {
					event.preventDefault();
					// dispatch(set(count));
					actions.set(count);
				}}
			>
				<label htmlFor="set-to">Set Count</label>
				<input
					id="set-to"
					type="number"
					value={count}
					onChange={(e) => setCount(e.target.value)}
				/>
				<input type="submit" />
			</form>
		</section>
	);
};
