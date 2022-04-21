import { configureStore } from "@reduxjs/toolkit";
import { dogSlice } from "./facstSlice";

export const store = configureStore({
	reducer: {
		facts: dogSlice.reducer,
	},
});
