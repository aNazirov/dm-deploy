import {createAsyncThunk} from "@reduxjs/toolkit";

import {eReportStatusType, IReportGetParams, IReportTelemedicineCreateParams} from "../../../models";
import {ReportService} from "../../../services";
import {
	deleteTelemedicineReportAction,
	setAllTelemedicineReportsAction,
	setTelemedicineReportByIdAction,
} from "./telemedicine.slices";

export const createTelemedicineReportThunk = createAsyncThunk(
	"telemedicineReport/createThunk",
	async (payload: IReportTelemedicineCreateParams, thunkAPI) => {
		const result = await ReportService.telemedicine.create(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setTelemedicineReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const updateTelemedicineReportThunk = createAsyncThunk(
	"telemedicineReport/updateThunk",
	async (
		payload: {id: number; body: Partial<IReportTelemedicineCreateParams>; deletingPartsIds?: number[]},
		thunkAPI,
	) => {
		payload.deletingPartsIds?.forEach((id) => ReportService.telemedicine.deletePart(id, thunkAPI.signal));
		const result = await ReportService.telemedicine.update(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setTelemedicineReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getTelemedicineReportByIdThunk = createAsyncThunk(
	"telemedicineReport/getThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.telemedicine.getById(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setTelemedicineReportByIdAction(result));
			return result;
		}
	},
	{dispatchConditionRejection: true},
);

export const changeStatusOfTelemedicineReportThunk = createAsyncThunk(
	"telemedicineReport/changeStatusThunk",
	async (payload: {id: number; statusId: eReportStatusType}, thunkAPI) => {
		const result = await ReportService.telemedicine.updateStatus(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setTelemedicineReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getAllTelemedicineReportsThunk = createAsyncThunk(
	"telemedicineReport/getAllThunk",
	async (payload: IReportGetParams | undefined, thunkAPI) => {
		const result = await ReportService.telemedicine.get(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setAllTelemedicineReportsAction({list: result.data, count: result.count}));
		}
	},
	{dispatchConditionRejection: true},
);

export const deleteTelemedicineReportThunk = createAsyncThunk(
	"telemedicineReport/deleteThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.telemedicine.delete(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(deleteTelemedicineReportAction(id));
			return result.status;
		}
	},
	{dispatchConditionRejection: true},
);
