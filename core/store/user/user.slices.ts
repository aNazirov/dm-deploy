import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {UserModel} from "../../models";

interface IState {
	user: UserModel | null;
}
const initialState: IState = {
	user: null,
};

export const {
	reducer: userReducer,
	actions: {setUserAction},
} = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserAction: (state: IState, action: PayloadAction<UserModel>) => {
			state.user = action.payload;
		},
	},
});
