import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {DepartureReportModel} from "../../../models";

interface IState {
	list: DepartureReportModel[];
	count: number;
	current: DepartureReportModel | null;
}

const initialState: IState = {
	list: [],
	count: 0,
	current: null,
};

export const {
	reducer: departureReportReducer,
	actions: {setDepartureReportByIdAction, setAllDepartureReportsAction, deleteDepartureReportAction},
} = createSlice({
	name: "departureReport",
	initialState,
	reducers: {
		setDepartureReportByIdAction: (state: IState, action: PayloadAction<DepartureReportModel | null>) => {
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
		setAllDepartureReportsAction: (
			state: IState,
			action: PayloadAction<{list: DepartureReportModel[]; count: number}>,
		) => {
			state.count = action.payload.count;
			state.list = action.payload.list;
		},
		deleteDepartureReportAction: (state: IState, action: PayloadAction<number>) => {
			const index = state.list.findIndex((r) => r.id === action.payload);
			if (index !== -1) {
				state.list.splice(index, 1);
			}
		},
	},
});
