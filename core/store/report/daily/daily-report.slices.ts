import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {DailyReportModel} from "../../../models";

interface IState {
	list: DailyReportModel[];
	count: number;
	current: DailyReportModel | null;
}

const initialState: IState = {
	list: [],
	count: 0,
	current: null,
};

export const {
	reducer: dailyReportReducer,
	actions: {setDailyReportByIdAction, setAllDailyReportsAction, deleteDailyReportAction},
} = createSlice({
	name: "dailyReport",
	initialState,
	reducers: {
		setDailyReportByIdAction: (state: IState, action: PayloadAction<DailyReportModel | null>) => {
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
		setAllDailyReportsAction: (state: IState, action: PayloadAction<{list: DailyReportModel[]; count: number}>) => {
			state.count = action.payload.count;
			if (state.list.length) {
				const ids = new Set(action.payload.list.map((r) => r.id));
				state.list = state.list.filter((old) => !ids.has(old.id)).concat(action.payload.list);
			} else {
				state.list = action.payload.list;
			}
		},
		deleteDailyReportAction: (state: IState, action: PayloadAction<number>) => {
			const index = state.list.findIndex((r) => r.id === action.payload);
			if (index !== -1) {
				state.list.splice(index, 1);
			}
		},
	},
});
