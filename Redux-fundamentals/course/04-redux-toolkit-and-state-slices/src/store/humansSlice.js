import { createSlice, nanoid } from "@reduxjs/toolkit";
import { tasksSlice } from "./tasksSlice";

const registerHuman = (name) => ({
	id: nanoid(),
	name,
	taskIds: [],
});

const initialState = [
	registerHuman("John"),
	registerHuman("Jane"),
	registerHuman("Jack"),
	registerHuman("Jill"),
];

export const humanSlice = createSlice({
	name: "humans",
	initialState,
	reducers: {
		add: (state, action) => {
			state.push(registerHuman(action.payload));
		},
	},
	extraReducers: (builder) => {
		builder.addCase(tasksSlice.actions.assignToUser, (state, action) => {
			for (const human of state) {
				if (human.id === action.payload.humanId) {
					human.taskIds.push(action.payload.taskId);
				} else {
					human.taskIds = human.taskIds.filter(
						(taskId) => taskId !== action.payload.taskId
					);
				}
			}
		});
	},
});
