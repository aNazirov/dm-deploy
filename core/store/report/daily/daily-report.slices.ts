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
	reducer: dailyReport,
	actions: {setDailyReportAction, setAllDailyReportsAction},
} = createSlice({
	name: "dailyReport",
	initialState,
	reducers: {
		setDailyReportAction: (state: IState, action: PayloadAction<DailyReportModel>) => {
			state.current = action.payload;

			if (!state.list.some((l) => l.id === action.payload.id)) {
				state.list.push(action.payload);
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
	},
});
