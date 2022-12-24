import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {TrainingReportModel} from "../../../models";

interface IState {
	list: TrainingReportModel[];
	count: number;
	current: TrainingReportModel | null;
}

const initialState: IState = {
	list: [],
	count: 0,
	current: null,
};

export const {
	reducer: trainingReportReducer,
	actions: {setTrainingReportByIdAction, setAllTrainingReportsAction},
} = createSlice({
	name: "trainingReport",
	initialState,
	reducers: {
		setTrainingReportByIdAction: (state: IState, action: PayloadAction<TrainingReportModel | null>) => {
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
		setAllTrainingReportsAction: (
			state: IState,
			action: PayloadAction<{list: TrainingReportModel[]; count: number}>,
		) => {
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
