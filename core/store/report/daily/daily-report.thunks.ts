import {createAsyncThunk} from "@reduxjs/toolkit";

import {eReportStatusType, IReportDailyCreateParams, IReportDailyGetParams} from "../../../models";
import {ReportService} from "../../../services";
import {setAllDailyReportsAction, setDailyReportAction} from "./daily-report.slices";

export const createDailyReportThunk = createAsyncThunk(
	"dailyReport/createThunk",
	async (payload: IReportDailyCreateParams, thunkAPI) => {
		const result = await ReportService.daily.create(payload);

		if (result) {
			thunkAPI.dispatch(setDailyReportAction(result));
			return result.id;
		}
	},
);

export const getDailyReportByIdThunk = createAsyncThunk("dailyReport/getThunk", async (id: number, thunkAPI) => {
	const result = await ReportService.daily.getById(id);

	if (result) {
		thunkAPI.dispatch(setDailyReportAction(result));
	}
});

export const changeStatusOfDailyReportThunk = createAsyncThunk(
	"dailyReport/changeStatusThunk",
	async (payload: {id: number; statusId: eReportStatusType}, thunkAPI) => {
		const result = await ReportService.daily.updateStatus(payload);

		if (result) {
			thunkAPI.dispatch(setDailyReportAction(result));
			return result.id;
		}
	},
);

export const getAllDailyReportsThunk = createAsyncThunk(
	"dailyReport/getAllThunk",
	async (payload: IReportDailyGetParams | undefined, thunkAPI) => {
		const result = await ReportService.daily.get(payload);

		if (result) {
			thunkAPI.dispatch(setAllDailyReportsAction({list: result.data, count: result.count}));
		}
	},
);

export const deleteDailyReportThunk = createAsyncThunk("dailyReport/deleteThunk", async (id: number, thunkAPI) => {
	const result = await ReportService.daily.delete(id);

	if (result) {
		console.log("res");
	}
});
