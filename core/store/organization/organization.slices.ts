import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {OrganizationModel} from "../../models";

interface IState {
	list: OrganizationModel[];
	count: number;
}
const initialState: IState = {
	list: [],
	count: 0,
};

export const {
	reducer: organizationReducer,
	actions: {setOrganizationToListAction, setAllOrganizationsAction, deleteOrganizationAction},
} = createSlice({
	name: "organization",
	initialState,
	reducers: {
		setOrganizationToListAction: (state: IState, action: PayloadAction<OrganizationModel | null>) => {
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
		setAllOrganizationsAction: (state: IState, action: PayloadAction<{count: number; list: OrganizationModel[]}>) => {
			state.count = action.payload.count;
			state.list = action.payload.list;
		},
		deleteOrganizationAction: (state: IState, action: PayloadAction<number>) => {
			const index = state.list.findIndex((r) => r.id === action.payload);
			if (index !== -1) {
				state.list.splice(index, 1);
			}
		},
	},
});
