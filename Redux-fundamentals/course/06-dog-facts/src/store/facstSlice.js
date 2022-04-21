import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDogFacts } from "../utilities";

const initialState = {
	facts: [],
	loading: false,
};

export const fetchDogFactsFromAPI = createAsyncThunk(
	"facts/fetchDogFactsFromAPI",
	async (count) => {
		const facts = await fetchDogFacts(count);
		return facts;
	}
);

export const dogSlice = createSlice({
	name: "facts",
	initialState,
	extraReducers: {
		[fetchDogFactsFromAPI.fulfilled]: (state, action) => {
			// state.push(...action.payload);
			console.log("fulfilled");
			state.facts = action.payload;
			state.loading = false;
			// return action.payload;
		},
	},
	[fetchDogFactsFromAPI.rejected]: (state, action) => {
		console.log(action.error);
		state.loading = false;
	},
	[fetchDogFactsFromAPI.pending]: (state, action) => {
		console.log("pending");
		state.loading = true;
	},
});
