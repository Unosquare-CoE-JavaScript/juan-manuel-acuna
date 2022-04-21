import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NewItemForm } from "../components/NewItemForm";
import { addNewItem } from "../store/items/actions";

// first way, 'classical'
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		onSubmit: (name, price) => dispatch(addNewItem(name, price)),
// 	};
// };

// second way, much more controlled, 'controlled'
// const mapDispatchToProps = (dispatch) => {
// 	return bindActionCreators(
// 		{
// 			onSubmit: (name, price) => addNewItem(name, price),
// 		},
// 		dispatch
// 	);
// };

// third way, ultra simple, just pass an object and redux do the rest
// but loosing a little bit of control, 'simplified'
const mapDispatchToProps = {
	onSubmit: (name, price) => addNewItem(name, price),
};

export const NewItemFormContainer = connect(
	null,
	mapDispatchToProps
)(NewItemForm);
