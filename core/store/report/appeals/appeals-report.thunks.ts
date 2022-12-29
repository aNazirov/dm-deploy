import {createAsyncThunk} from "@reduxjs/toolkit";

import {eReportStatusType, IReportAppealsCreateParams, IReportGetParams} from "../../../models";
import {FileService, ReportService} from "../../../services";
import {
	deleteAppealsReportAction,
	setAllAppealsReportsAction,
	setAppealsReportByIdAction,
} from "./appeals-report.slices";

export const createAppealsReportThunk = createAsyncThunk(
	"appealsReport/createThunk",
	async ({payload, formData}: {payload: IReportAppealsCreateParams; formData: FormData}, thunkAPI) => {
		const files = await FileService.post(formData);

		if (files) {
			const result = await ReportService.appeals.create({...payload, files: files.map((f) => f.id)}, thunkAPI.signal);

			if (result) {
				thunkAPI.dispatch(setAppealsReportByIdAction(result));
				return result.id;
			}
		}
	},
	{dispatchConditionRejection: true},
);

export const getAppealsReportByIdThunk = createAsyncThunk(
	"appealsReport/getThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.appeals.getById(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setAppealsReportByIdAction(result));
		}
	},
	{dispatchConditionRejection: true},
);

export const changeStatusOfAppealsReportThunk = createAsyncThunk(
	"appealsReport/changeStatusThunk",
	async (payload: {id: number; statusId: eReportStatusType}, thunkAPI) => {
		const result = await ReportService.appeals.updateStatus(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setAppealsReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getAllAppealsReportsThunk = createAsyncThunk(
	"appealsReport/getAllThunk",
	async (payload: IReportGetParams | undefined, thunkAPI) => {
		const result = await ReportService.appeals.get(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setAllAppealsReportsAction({list: result.data, count: result.count}));
		}
	},
	{dispatchConditionRejection: true},
);

export const deleteAppealsReportThunk = createAsyncThunk(
	"appealsReport/deleteThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.appeals.delete(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(deleteAppealsReportAction(id));
			return result.status;
		}
	},
	{dispatchConditionRejection: true},
);
