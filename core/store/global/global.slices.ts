import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IState {
	isDarkMode: boolean;
}

const initialState: IState = {
	isDarkMode: false,
};

export const {
	reducer: globalReducer,
	actions: {setIsDarkMode},
} = createSlice({
	initialState,
	name: "global",
	reducers: {
		setIsDarkMode: (state, action: PayloadAction<IState["isDarkMode"]>) => {
			state.isDarkMode = action.payload;
		},
	},
});
