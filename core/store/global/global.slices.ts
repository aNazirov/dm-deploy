import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {GlobalListItemModel} from "../../models";

interface IState {
	isDarkMode: boolean;
	countries: GlobalListItemModel[];
	specialities: GlobalListItemModel[];
}

const initialState: IState = {
	isDarkMode: false,
	countries: [],
	specialities: [],
};

export const {
	reducer: globalReducer,
	actions: {setIsDarkMode, setGlobalListAction},
} = createSlice({
	initialState,
	name: "global",
	reducers: {
		setIsDarkMode: (state, action: PayloadAction<IState["isDarkMode"]>) => {
			state.isDarkMode = action.payload;
		},
		setGlobalListAction: (
			state: IState,
			action: PayloadAction<{data: GlobalListItemModel[]; listType: "countries" | "specialities"}>,
		) => {
			state[action.payload.listType] = action.payload.data;
		},
	},
});
