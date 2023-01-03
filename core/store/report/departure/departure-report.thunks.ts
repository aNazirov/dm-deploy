import {createAsyncThunk} from "@reduxjs/toolkit";

import {eReportStatusType, IReportDepartureCreateParams, IReportGetParams} from "../../../models";
import {ReportService} from "../../../services";
import {
	deleteDepartureReportAction,
	setAllDepartureReportsAction,
	setDepartureReportByIdAction,
} from "./departure-report.slices";

export const createDepartureReportThunk = createAsyncThunk(
	"departureReport/createThunk",
	async (payload: IReportDepartureCreateParams, thunkAPI) => {
		const result = await ReportService.departure.create(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setDepartureReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const updateDepartureReportThunk = createAsyncThunk(
	"departureReport/updateThunk",
	async (payload: {id: number; body: Partial<IReportDepartureCreateParams>}, thunkAPI) => {
		const result = await ReportService.departure.update(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setDepartureReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getDepartureReportByIdThunk = createAsyncThunk(
	"departureReport/getThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.departure.getById(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setDepartureReportByIdAction(result));
			return result;
		}
	},
	{dispatchConditionRejection: true},
);

export const changeStatusOfDepartureReportThunk = createAsyncThunk(
	"departureReport/changeStatusThunk",
	async (payload: {id: number; statusId: eReportStatusType}, thunkAPI) => {
		const result = await ReportService.departure.updateStatus(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setDepartureReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getAllDepartureReportsThunk = createAsyncThunk(
	"departureReport/getAllThunk",
	async (payload: IReportGetParams | undefined, thunkAPI) => {
		const result = await ReportService.departure.get(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setAllDepartureReportsAction({list: result.data, count: result.count}));
		}
	},
	{dispatchConditionRejection: true},
);

export const deleteDepartureReportThunk = createAsyncThunk(
	"departureReport/deleteThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.departure.delete(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(deleteDepartureReportAction(id));
			return result.status;
		}
	},
	{dispatchConditionRejection: true},
);
