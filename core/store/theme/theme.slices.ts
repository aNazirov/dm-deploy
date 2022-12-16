import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
	isDarkMode: false,
};

export const {
	reducer: themeReducer,
	actions: {setIsDarkMode},
} = createSlice({
	initialState,
	name: "theme",
	reducers: {
		setIsDarkMode: (state, action: PayloadAction<boolean>) => {
			state.isDarkMode = action.payload;
		},
	},
});
