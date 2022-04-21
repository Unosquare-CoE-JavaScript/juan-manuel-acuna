import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { pricePerItem } from "../constants";
import { formatCurrency } from "../utilities";

// create the context
const OrderDetails = createContext();

// create custom hook to check whether we're inside a provider
export function useOrderDetails() {
	const context = useContext(OrderDetails);
	if (!context) {
		throw new Error(
			"useOrderDetails must be used within an OrderDetailsProvider"
		);
	}
	return context;
}

function calculateSubtotal(optionType, optionCounts) {
	let optionCount = 0;
	for (const count of optionCounts[optionType].values()) {
		optionCount += count;
	}
	return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props) {
	const [optionCounts, setOptionCounts] = useState({
		scoops: new Map(),
		toppings: new Map(),
	});

	const [totals, setTotals] = useState({
		scoops: formatCurrency(0),
		toppings: formatCurrency(0),
		grandTotal: formatCurrency(0),
	});

	useEffect(() => {
		const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
		const toppinsgSuptotal = calculateSubtotal("toppings", optionCounts);
		const grandTotal = scoopsSubtotal + toppinsgSuptotal;
		setTotals({
			scoops: formatCurrency(scoopsSubtotal),
			toppings: formatCurrency(toppinsgSuptotal),
			grandTotal: formatCurrency(grandTotal),
		});
	}, [optionCounts]);

	const value = useMemo(() => {
		function updateItemCount(itemName, newItemCount, optionType) {
			// create a copy
			const newOptionCounts = { ...optionCounts };

			// update option count for this item with the new value
			const optionCountsMap = optionCounts[optionType];
			optionCountsMap.set(itemName, parseInt(newItemCount));

			setOptionCounts(newOptionCounts);
		}

		function resetOrder() {
			setOptionCounts({
				scoops: new Map(),
				toppings: new Map(),
			});
		}

		// returns an array with a getter and a setter
		// getter: object containing option counts for scoops and toppings
		// and the subtotal
		// setter: updateOptionCount
		return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
	}, [optionCounts, totals]);

	return <OrderDetails.Provider value={value} {...props} />;
}
