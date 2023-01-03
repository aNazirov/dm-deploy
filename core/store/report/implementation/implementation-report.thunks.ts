import {createAsyncThunk} from "@reduxjs/toolkit";

import {eReportStatusType, IReportGetParams, IReportImplementationCreateParams} from "../../../models";
import {ReportService} from "../../../services";
import {
	deleteImplementationReportAction,
	setAllImplementationReportsAction,
	setImplementationReportByIdAction,
} from "./implementation-report.slices";

export const createImplementationReportThunk = createAsyncThunk(
	"implementationReport/createThunk",
	async (payload: IReportImplementationCreateParams, thunkAPI) => {
		const result = await ReportService.implementation.create(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setImplementationReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const updateImplementationReportThunk = createAsyncThunk(
	"implementationReport/updateThunk",
	async (
		payload: {id: number; body: Partial<IReportImplementationCreateParams>; deletingPartsIds?: number[]},
		thunkAPI,
	) => {
		payload.deletingPartsIds?.forEach((id) => ReportService.implementation.deletePart(id, thunkAPI.signal));

		const result = await ReportService.implementation.update(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setImplementationReportByIdAction(result));
			return result;
		}
	},
	{dispatchConditionRejection: true},
);

export const getImplementationReportByIdThunk = createAsyncThunk(
	"implementationReport/getThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.implementation.getById(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setImplementationReportByIdAction(result));
			return result;
		}
	},
	{dispatchConditionRejection: true},
);

export const changeStatusOfImplementationReportThunk = createAsyncThunk(
	"implementationReport/changeStatusThunk",
	async (payload: {id: number; statusId: eReportStatusType}, thunkAPI) => {
		const result = await ReportService.implementation.updateStatus(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setImplementationReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getAllImplementationReportsThunk = createAsyncThunk(
	"implementationReport/getAllThunk",
	async (payload: IReportGetParams | undefined, thunkAPI) => {
		const result = await ReportService.implementation.get(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setAllImplementationReportsAction({list: result.data, count: result.count}));
		}
	},
	{dispatchConditionRejection: true},
);

export const deleteImplementationReportThunk = createAsyncThunk(
	"implementationReport/deleteThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.implementation.delete(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(deleteImplementationReportAction(id));
			return result.status;
		}
	},
	{dispatchConditionRejection: true},
);
