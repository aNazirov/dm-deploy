import {createAsyncThunk} from "@reduxjs/toolkit";

import {eReportStatusType, IReportGetParams, IReportScientificEventsCreateParams} from "../../../models";
import {ReportService} from "../../../services";
import {
	deleteScientificEventsReportAction,
	setAllScientificEventsReportsAction,
	setScientificEventsReportByIdAction,
} from "./scientific-events-report.slices";

export const createScientificEventsReportThunk = createAsyncThunk(
	"scientificEventsReport/createThunk",
	async (payload: IReportScientificEventsCreateParams, thunkAPI) => {
		const result = await ReportService.scientificEvents.create(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setScientificEventsReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getScientificEventsReportByIdThunk = createAsyncThunk(
	"scientificEventsReport/getThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.scientificEvents.getById(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setScientificEventsReportByIdAction(result));
		}
	},
	{dispatchConditionRejection: true},
);

export const changeStatusOfScientificEventsReportThunk = createAsyncThunk(
	"scientificEventsReport/changeStatusThunk",
	async (payload: {id: number; statusId: eReportStatusType}, thunkAPI) => {
		const result = await ReportService.scientificEvents.updateStatus(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setScientificEventsReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getAllScientificEventsReportsThunk = createAsyncThunk(
	"scientificEventsReport/getAllThunk",
	async (payload: IReportGetParams | undefined, thunkAPI) => {
		const result = await ReportService.scientificEvents.get(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setAllScientificEventsReportsAction({list: result.data, count: result.count}));
		}
	},
	{dispatchConditionRejection: true},
);

export const deleteScientificEventsReportThunk = createAsyncThunk(
	"scientificEventsReport/deleteThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.scientificEvents.delete(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(deleteScientificEventsReportAction(id));
			return result.status;
		}
	},
	{dispatchConditionRejection: true},
);
