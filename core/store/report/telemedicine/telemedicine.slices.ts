import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {TelemedicineReportModel} from "../../../models";

interface IState {
	list: TelemedicineReportModel[];
	count: number;
	current: TelemedicineReportModel | null;
}

const initialState: IState = {
	list: [],
	count: 0,
	current: null,
};

export const {
	reducer: telemedicineReportReducer,
	actions: {setTelemedicineReportByIdAction, setAllTelemedicineReportsAction, deleteTelemedicineReportAction},
} = createSlice({
	name: "telemedicineReport",
	initialState,
	reducers: {
		setTelemedicineReportByIdAction: (state: IState, action: PayloadAction<TelemedicineReportModel | null>) => {
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
		setAllTelemedicineReportsAction: (
			state: IState,
			action: PayloadAction<{list: TelemedicineReportModel[]; count: number}>,
		) => {
			state.count = action.payload.count;
			state.list = action.payload.list;
		},
		deleteTelemedicineReportAction: (state: IState, action: PayloadAction<number>) => {
			const index = state.list.findIndex((r) => r.id === action.payload);
			if (index !== -1) {
				state.list.splice(index, 1);
			}
		},
	},
});
