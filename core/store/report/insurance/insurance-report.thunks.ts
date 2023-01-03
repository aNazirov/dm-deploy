import {createAsyncThunk} from "@reduxjs/toolkit";

import {eReportStatusType, IReportGetParams, IReportInsuranceCreateParams} from "../../../models";
import {ReportService} from "../../../services";
import {
	deleteInsuranceReportAction,
	setAllInsuranceReportsAction,
	setInsuranceReportByIdAction,
} from "./insurance-report.slices";

export const createInsuranceReportThunk = createAsyncThunk(
	"insuranceReport/createThunk",
	async (payload: IReportInsuranceCreateParams, thunkAPI) => {
		const result = await ReportService.insurance.create(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setInsuranceReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const updateInsuranceReportThunk = createAsyncThunk(
	"insuranceReport/updateThunk",
	async (payload: {id: number; body: Partial<IReportInsuranceCreateParams>}, thunkAPI) => {
		const result = await ReportService.insurance.update(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setInsuranceReportByIdAction(result));
			return result;
		}
	},
	{dispatchConditionRejection: true},
);

export const getInsuranceReportByIdThunk = createAsyncThunk(
	"insuranceReport/getThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.insurance.getById(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setInsuranceReportByIdAction(result));
			return result;
		}
	},
	{dispatchConditionRejection: true},
);

export const changeStatusOfInsuranceReportThunk = createAsyncThunk(
	"insuranceReport/changeStatusThunk",
	async (payload: {id: number; statusId: eReportStatusType}, thunkAPI) => {
		const result = await ReportService.insurance.updateStatus(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setInsuranceReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getAllInsuranceReportsThunk = createAsyncThunk(
	"insuranceReport/getAllThunk",
	async (payload: IReportGetParams | undefined, thunkAPI) => {
		const result = await ReportService.insurance.get(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setAllInsuranceReportsAction({list: result.data, count: result.count}));
		}
	},
	{dispatchConditionRejection: true},
);

export const deleteInsuranceReportThunk = createAsyncThunk(
	"insuranceReport/deleteThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.insurance.delete(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(deleteInsuranceReportAction(id));
			return result.status;
		}
	},
	{dispatchConditionRejection: true},
);
