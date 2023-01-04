import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {InsuranceReportModel} from "../../../models";

interface IState {
	list: InsuranceReportModel[];
	count: number;
	current: InsuranceReportModel | null;
}

const initialState: IState = {
	list: [],
	count: 0,
	current: null,
};

export const {
	reducer: insuranceReportReducer,
	actions: {setInsuranceReportByIdAction, setAllInsuranceReportsAction, deleteInsuranceReportAction},
} = createSlice({
	name: "insuranceReport",
	initialState,
	reducers: {
		setInsuranceReportByIdAction: (state: IState, action: PayloadAction<InsuranceReportModel | null>) => {
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
		setAllInsuranceReportsAction: (
			state: IState,
			action: PayloadAction<{list: InsuranceReportModel[]; count: number}>,
		) => {
			state.count = action.payload.count;
			state.list = action.payload.list;
		},
		deleteInsuranceReportAction: (state: IState, action: PayloadAction<number>) => {
			const index = state.list.findIndex((r) => r.id === action.payload);
			if (index !== -1) {
				state.list.splice(index, 1);
			}
		},
	},
});
