import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {UserModel} from "../../models";

interface IState {
	current: UserModel | null;
	list: UserModel[];
	count: number;
}
const initialState: IState = {
	current: null,
	list: [],
	count: 0,
};

export const {
	reducer: userReducer,
	actions: {setCurrentUserAction, setUserToListAction, setAllUsersAction},
} = createSlice({
	name: "user",
	initialState,
	reducers: {
		setCurrentUserAction: (state: IState, action: PayloadAction<UserModel | null>) => {
			state.current = action.payload;
		},
		setUserToListAction: (state: IState, action: PayloadAction<UserModel | null>) => {
			if (action.payload) {
				const index = state.list.findIndex((l) => l.id === action.payload?.id);
				if (index === -1) {
					state.list.push(action.payload);
				} else {
					state.list[index] = action.payload;
				}
			}
		},
		// TODO: make all other actions like action below
		setAllUsersAction: (state: IState, action: PayloadAction<{count: number; list: UserModel[]}>) => {
			state.count = action.payload.count;
			state.list = action.payload.list;
		},
		deleteUserAction: (state: IState, action: PayloadAction<number>) => {
			const index = state.list.findIndex((r) => r.id === action.payload);
			if (index !== -1) {
				state.list.splice(index, 1);
			}
		},
	},
});
