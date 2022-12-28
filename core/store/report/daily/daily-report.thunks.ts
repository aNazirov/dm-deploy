import {createAsyncThunk} from "@reduxjs/toolkit";

import {eReportStatusType, IReportDailyCreateParams, IReportGetParams} from "../../../models";
import {ReportService} from "../../../services";
import {deleteDailyReportAction, setAllDailyReportsAction, setDailyReportByIdAction} from "./daily-report.slices";

export const createDailyReportThunk = createAsyncThunk(
	"dailyReport/createThunk",
	async (payload: IReportDailyCreateParams, thunkAPI) => {
		const result = await ReportService.daily.create(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setDailyReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getDailyReportByIdThunk = createAsyncThunk(
	"dailyReport/getThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.daily.getById(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setDailyReportByIdAction(result));
		}
	},
	{dispatchConditionRejection: true},
);

export const changeStatusOfDailyReportThunk = createAsyncThunk(
	"dailyReport/changeStatusThunk",
	async (payload: {id: number; statusId: eReportStatusType}, thunkAPI) => {
		const result = await ReportService.daily.updateStatus(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setDailyReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getAllDailyReportsThunk = createAsyncThunk(
	"dailyReport/getAllThunk",
	async (payload: IReportGetParams | undefined, thunkAPI) => {
		const result = await ReportService.daily.get(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setAllDailyReportsAction({list: result.data, count: result.count}));
		}
	},
	{dispatchConditionRejection: true},
);

export const deleteDailyReportThunk = createAsyncThunk(
	"dailyReport/deleteThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.daily.delete(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(deleteDailyReportAction(id));
			return result.status;
		}
	},
	{dispatchConditionRejection: true},
);
