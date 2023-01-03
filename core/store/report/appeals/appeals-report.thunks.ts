import {createAsyncThunk} from "@reduxjs/toolkit";

import {eReportStatusType, FileModel, IReportAppealsCreateParams, IReportGetParams} from "../../../models";
import {FileService, ReportService} from "../../../services";
import {deleteFileThunk} from "../../file/file.thunks";
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

export const updateAppealsReportThunk = createAsyncThunk(
	"appealsReport/updateThunk",
	async (
		payload: {
			id: number;
			body: Partial<IReportAppealsCreateParams>;
			deletingFilesIds?: number[];
			formData?: FormData;
		},
		thunkAPI,
	) => {
		payload.deletingFilesIds?.forEach((id) => thunkAPI.dispatch(deleteFileThunk(id)));
		const files: FileModel[] = [];

		if (payload.formData) {
			files.push(...(await FileService.post(payload.formData)));
		}

		const result = await ReportService.appeals.update(
			{...payload, body: {...payload.body, files: files.map((f) => f.id)}},
			thunkAPI.signal,
		);

		if (result) {
			thunkAPI.dispatch(setAppealsReportByIdAction(result));
			return result.id;
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
			return result;
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
