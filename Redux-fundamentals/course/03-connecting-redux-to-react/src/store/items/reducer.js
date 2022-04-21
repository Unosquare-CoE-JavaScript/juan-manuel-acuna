import produce from "immer";
import {
	ITEM_ADDED,
	ITEM_REMOVED,
	ITEM_PRICE_UPDATED,
	ITEM_QUANTITY_UPDATED,
} from "./actions";

let id = 1;

export const initialItems = [
	{ uuid: id++, name: "Awesome Tofu Roast", price: 14, quantity: 1 },
	{ uuid: id++, name: "Vegan Ham sandwich", price: 12, quantity: 1 },
];

export const reducer = produce((state = initialItems, action) => {
	if (action.type === ITEM_ADDED) {
		const item = { uuid: id++, quantity: 1, ...action.payload };
		state.push(item);
	}

	if (action.type === ITEM_REMOVED) {
		return state.filte((item) => item.uuid !== action.payload.uuid);
	}

	if (action.type === ITEM_PRICE_UPDATED) {
		const item = state.find((item) => item.uuid === action.payload.uuid);
		item.price = parseInt(action.payload.price, 10);
	}

	if (action.type === ITEM_QUANTITY_UPDATED) {
		const item = state.find((item) => item.uuid === action.payload.uuid);
		item.quantity = parseInt(action.payload.quantity);
	}
}, initialItems);
/*
export const reducer = (state = initialItems, action) => {
	switch (action.type) {
		// case ITEM_ADDED:
		// 	const item = { uuid: id++, quantity: 1, ...action.payload };
		// 	return [...state, item];

		case ITEM_ADDED:
			return produce(state, (draftState) => {
				const item = { uuid: id++, quantity: 1, ...action.payload };
				draftState.push(item);
			});

		case ITEM_REMOVED:
			return state.filter((item) => item.uuid !== action.payload.uuid);

		// case ITEM_PRICE_UPDATED:
		// 	return state.map((item) => {
		// 		if (item.uuid === action.payload.uuid) {
		// 			return { ...item, price: parseInt(action.payload.price) };
		// 		}
		// 		return item;
		// 	});
		case ITEM_PRICE_UPDATED:
			return produce(state, (draftState) => {
				const item = draftState.find(
					(item) => (item === item.uuid) === action.payload.uuid
				);
				item.price = parseInt(action.payload.price, 10);
			});

		// case ITEM_QUANTITY_UPDATED:
		// 	return state.map((item) => {
		// 		if (item.uuid === action.payload.uuid) {
		// 			return { ...item, quantity: parseInt(action.payload.quantity) };
		// 		}
		// 		return item;
		// 	});

		case ITEM_QUANTITY_UPDATED:
			return produce(state, (draftState) => {
				const item = draftState.find(
					(item) => (item === item.uuid) === action.payload.uuid
				);
				item.quantity = parseInt(action.payload.quantity, 10);
			});

		default:
			return state;
	}
};
*/

export default reducer;
