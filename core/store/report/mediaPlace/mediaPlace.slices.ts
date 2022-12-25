import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {MediaPlaceReportModel} from "../../../models";

interface IState {
	list: MediaPlaceReportModel[];
	count: number;
	current: MediaPlaceReportModel | null;
}

const initialState: IState = {
	list: [],
	count: 0,
	current: null,
};

export const {
	reducer: mediaPlaceReportReducer,
	actions: {setMediaPlaceReportByIdAction, setAllMediaPlaceReportsAction},
} = createSlice({
	name: "mediaPlaceReport",
	initialState,
	reducers: {
		setMediaPlaceReportByIdAction: (state: IState, action: PayloadAction<MediaPlaceReportModel | null>) => {
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
		setAllMediaPlaceReportsAction: (
			state: IState,
			action: PayloadAction<{list: MediaPlaceReportModel[]; count: number}>,
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
