import {createAsyncThunk} from "@reduxjs/toolkit";

import {eReportStatusType, IReportTrainingCreateParams, IReportTrainingGetParams} from "../../../models";
import {FileService, ReportService} from "../../../services";
import {setAllTrainingReportsAction, setTrainingReportByIdAction} from "./training-report.slices";

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

export const getTrainingReportByIdThunk = createAsyncThunk(
	"trainingReport/getThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.training.getById(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setTrainingReportByIdAction(result));
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
	async (payload: IReportTrainingGetParams | undefined, thunkAPI) => {
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
			console.log("res");
		}
	},
	{dispatchConditionRejection: true},
);
