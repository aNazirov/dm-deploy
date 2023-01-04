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
	actions: {setMediaPlaceReportByIdAction, setAllMediaPlaceReportsAction, deleteMediaPlaceReportAction},
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
			state.list = action.payload.list;
		},
		deleteMediaPlaceReportAction: (state: IState, action: PayloadAction<number>) => {
			const index = state.list.findIndex((r) => r.id === action.payload);
			if (index !== -1) {
				state.list.splice(index, 1);
			}
		},
	},
});
