import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {VisitsOfForeignSpecialistsModel} from "../../../models";

interface IState {
	list: VisitsOfForeignSpecialistsModel[];
	count: number;
	current: VisitsOfForeignSpecialistsModel | null;
}

const initialState: IState = {
	list: [],
	count: 0,
	current: null,
};

export const {
	reducer: visitForeignSpecialistsReportReducer,
	actions: {
		setVisitForeignSpecialistsReportByIdAction,
		setAllVisitForeignSpecialistsReportsAction,
		deleteVisitForeignSpecialistsReportAction,
	},
} = createSlice({
	name: "visitForeignSpecialistsReport",
	initialState,
	reducers: {
		setVisitForeignSpecialistsReportByIdAction: (
			state: IState,
			action: PayloadAction<VisitsOfForeignSpecialistsModel | null>,
		) => {
			state.current = action.payload;

			if (action.payload) {
				const index = state.list.findIndex((l) => l.id === action.payload?.id);
				if (index === -1) {
					state.list.push(action.payload);
				} else {
					state.list[index] = action.payload;
				}
			}
		},
		setAllVisitForeignSpecialistsReportsAction: (
			state: IState,
			action: PayloadAction<{list: VisitsOfForeignSpecialistsModel[]; count: number}>,
		) => {
			state.count = action.payload.count;
			state.list = action.payload.list;
		},
		deleteVisitForeignSpecialistsReportAction: (state: IState, action: PayloadAction<number>) => {
			const index = state.list.findIndex((r) => r.id === action.payload);
			if (index !== -1) {
				state.list.splice(index, 1);
			}
		},
	},
});
