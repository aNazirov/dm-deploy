import {createAsyncThunk} from "@reduxjs/toolkit";

import {eReportStatusType, IReportGetParams, IReportScienceCreateParams} from "../../../models";
import {FileService, ReportService} from "../../../services";
import {deleteScienceReportAction, setAllScienceReportsAction, setScienceReportByIdAction} from "./science.slices";

export const createScienceReportThunk = createAsyncThunk(
	"scienceReport/createThunk",
	async ({payload, formData}: {payload: IReportScienceCreateParams; formData: FormData}, thunkAPI) => {
		const files = await FileService.post(formData);
		const reportsWithFile = {
			scienceParts: payload.scienceParts
				.map((p) => {
					const currentFile = files.find((f) => f.originalName === p.fileName);

					return {...p, fileId: currentFile?.id ?? 0};
				})
				.filter((p) => p.fileId),
		};

		if (files && files.length) {
			const result = await ReportService.science.create(reportsWithFile, thunkAPI.signal);

			if (result) {
				thunkAPI.dispatch(setScienceReportByIdAction(result));
				return result.id;
			}
		}
	},
	{dispatchConditionRejection: true},
);

export const getScienceReportByIdThunk = createAsyncThunk(
	"scienceReport/getThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.science.getById(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setScienceReportByIdAction(result));
		}
	},
	{dispatchConditionRejection: true},
);

export const changeStatusOfScienceReportThunk = createAsyncThunk(
	"scienceReport/changeStatusThunk",
	async (payload: {id: number; statusId: eReportStatusType}, thunkAPI) => {
		const result = await ReportService.science.updateStatus(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setScienceReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getAllScienceReportsThunk = createAsyncThunk(
	"scienceReport/getAllThunk",
	async (payload: IReportGetParams | undefined, thunkAPI) => {
		const result = await ReportService.science.get(payload, thunkAPI.signal);
		if (result) {
			thunkAPI.dispatch(setAllScienceReportsAction({list: result.data, count: result.count}));
		}
	},
	{dispatchConditionRejection: true},
);

export const deleteScienceReportThunk = createAsyncThunk(
	"scienceReport/deleteThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.science.delete(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(deleteScienceReportAction(id));
			return result.status;
		}
	},
	{dispatchConditionRejection: true},
);
