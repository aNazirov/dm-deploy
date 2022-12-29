import {createAsyncThunk} from "@reduxjs/toolkit";

import {eReportStatusType, IReportCreateScientificWorksParams, IReportGetParams} from "../../../models";
import {ReportService} from "../../../services";
import {
	deleteScientificWorksReportAction,
	setAllScientificWorksReportsAction,
	setScientificWorksReportByIdAction,
} from "./scientific-works-report.slices";

export const createScientificWorksReportThunk = createAsyncThunk(
	"scientificWorksReport/createThunk",
	async (payload: IReportCreateScientificWorksParams, thunkAPI) => {
		const result = await ReportService.scientificWorks.create(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setScientificWorksReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getScientificWorksReportByIdThunk = createAsyncThunk(
	"scientificWorksReport/getThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.scientificWorks.getById(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setScientificWorksReportByIdAction(result));
		}
	},
	{dispatchConditionRejection: true},
);

export const changeStatusOfScientificWorksReportThunk = createAsyncThunk(
	"scientificWorksReport/changeStatusThunk",
	async (payload: {id: number; statusId: eReportStatusType}, thunkAPI) => {
		const result = await ReportService.scientificWorks.updateStatus(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setScientificWorksReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getAllScientificWorksReportsThunk = createAsyncThunk(
	"scientificWorksReport/getAllThunk",
	async (payload: IReportGetParams | undefined, thunkAPI) => {
		const result = await ReportService.scientificWorks.get(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setAllScientificWorksReportsAction({list: result.data, count: result.count}));
		}
	},
	{dispatchConditionRejection: true},
);

export const deleteScientificWorksReportThunk = createAsyncThunk(
	"scientificWorksReport/deleteThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.scientificWorks.delete(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(deleteScientificWorksReportAction(id));
			return result.status;
		}
	},
	{dispatchConditionRejection: true},
);
