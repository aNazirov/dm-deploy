import {createAsyncThunk} from "@reduxjs/toolkit";

import {eReportStatusType, FileModel, IReportGetParams, IReportTrainingCreateParams} from "../../../models";
import {FileService, ReportService} from "../../../services";
import {deleteFileThunk} from "../../file/file.thunks";
import {
	deleteTrainingReportAction,
	setAllTrainingReportsAction,
	setTrainingReportByIdAction,
} from "./training-report.slices";

export const createTrainingReportThunk = createAsyncThunk(
	"trainingReport/createThunk",
	async ({payload, formData}: {payload: IReportTrainingCreateParams; formData: FormData}, thunkAPI) => {
		const files = await FileService.post(formData);

		if (files) {
			const result = await ReportService.training.create({...payload, files: files.map((f) => f.id)}, thunkAPI.signal);

			if (result) {
				thunkAPI.dispatch(setTrainingReportByIdAction(result));
				return result.id;
			}
		}
	},
	{dispatchConditionRejection: true},
);

export const updateTrainingReportThunk = createAsyncThunk(
	"trainingReport/updateThunk",
	async (
		payload: {
			id: number;
			body: Partial<IReportTrainingCreateParams>;
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

		const result = await ReportService.training.update(
			{...payload, body: {...payload.body, files: files.map((f) => f.id)}},
			thunkAPI.signal,
		);

		if (result) {
			thunkAPI.dispatch(setTrainingReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getTrainingReportByIdThunk = createAsyncThunk(
	"trainingReport/getThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.training.getById(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setTrainingReportByIdAction(result));
			return result;
		}
	},
	{dispatchConditionRejection: true},
);

export const changeStatusOfTrainingReportThunk = createAsyncThunk(
	"trainingReport/changeStatusThunk",
	async (payload: {id: number; statusId: eReportStatusType}, thunkAPI) => {
		const result = await ReportService.training.updateStatus(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setTrainingReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getAllTrainingReportsThunk = createAsyncThunk(
	"trainingReport/getAllThunk",
	async (payload: IReportGetParams | undefined, thunkAPI) => {
		const result = await ReportService.training.get(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setAllTrainingReportsAction({list: result.data, count: result.count}));
		}
	},
	{dispatchConditionRejection: true},
);

export const deleteTrainingReportThunk = createAsyncThunk(
	"trainingReport/deleteThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.training.delete(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(deleteTrainingReportAction(id));
			return result.status;
		}
	},
	{dispatchConditionRejection: true},
);
