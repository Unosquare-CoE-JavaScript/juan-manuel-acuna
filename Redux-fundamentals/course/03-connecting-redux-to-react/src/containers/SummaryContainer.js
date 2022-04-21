import { connect } from "react-redux";
import { Summary } from "../components/Summary";
import {
	selectSubtotal,
	selectTipAmount,
	selectTotal,
} from "../store/items/selectors";

const mapStateToProps = (state) => {
	// const items = state.items;

	// /**
	//  * Subtotal version made using a for
	//  */
	// // let subtotal = 0;
	// // for (const item of items) {
	// // 	subtotal += item.price * item.quantity;
	// // }

	// /**
	//  * Subtotal version made using reduce
	//  */
	// const subtotal = items.reduce(
	// 	(sum, item) => sum + item.price * item.quantity,
	// 	0
	// );

	// const tipAmount = subtotal * (state.tipPercentage / 100);

	const subtotal = selectSubtotal(state);
	const tipAmount = selectTipAmount(state);
	const total = selectTotal(state);

	// const total = subtotal + tipAmount;

	return {
		subtotal,
		tipAmount,
		total,
	};
};

export const SummaryContainer = connect(mapStateToProps)(Summary);
