import { connect } from "react-redux";
import MenuItem from "../components/MenuItem";
import {
	removeItem,
	updatePrice,
	updateQuantity,
} from "../store/items/actions";
import { selectItemTotal } from "../store/items/selectors";

/**
 * NOTE:
 * We can use here just the math and return price * quantity
 * But in this case we prefer to achive this mission
 * using the createSelector
 */
// const mapStateToProps = (ownProps) => {
// 	return {
// 		total: ownProps.price * ownProps.quantity,
// 	};
// };

const mapStateToProps = (state, props) => {
	return { total: selectItemTotal(state, props) };
};

const mapDisppatchToProps = (dispatch, ownProps) => {
	return {
		remove: () => dispatch(removeItem(ownProps.uuid)),
		updatePrice: (price) => dispatch(updatePrice(ownProps.uuid, price)),
		updateQuantity: (quantity) =>
			dispatch(updateQuantity(ownProps.uuid, quantity)),
	};
};

export const MenuItemContainer = connect(
	mapStateToProps,
	mapDisppatchToProps
)(MenuItem);
