import {createAsyncThunk} from "@reduxjs/toolkit";

import {eReportStatusType, IReportMediaPlaceCreateParams, IReportMediaPlaceGetParams} from "../../../models";
import {FileService, ReportService} from "../../../services";
import {
	deleteMediaPlaceReportAction,
	setAllMediaPlaceReportsAction,
	setMediaPlaceReportByIdAction,
} from "./mediaPlace.slices";

export const createMediaPlaceReportThunk = createAsyncThunk(
	"mediaPlaceReport/createThunk",
	async ({payload, formData}: {payload: IReportMediaPlaceCreateParams; formData: FormData}, thunkAPI) => {
		const files = await FileService.post(formData);

		if (files && files.length) {
			const reportsWithFile = payload.mediaParts.map((v, i) => ({...v, fileId: files[i].id}));

			const result = await ReportService.mediaPlace.create({mediaParts: reportsWithFile}, thunkAPI.signal);

			if (result) {
				thunkAPI.dispatch(setMediaPlaceReportByIdAction(result));
				return result.id;
			}
		}
	},
	{dispatchConditionRejection: true},
);

export const getMediaPlaceReportByIdThunk = createAsyncThunk(
	"mediaPlaceReport/getThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.mediaPlace.getById(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setMediaPlaceReportByIdAction(result));
		}
	},
	{dispatchConditionRejection: true},
);

export const changeStatusOfMediaPlaceReportThunk = createAsyncThunk(
	"mediaPlaceReport/changeStatusThunk",
	async (payload: {id: number; statusId: eReportStatusType}, thunkAPI) => {
		const result = await ReportService.mediaPlace.updateStatus(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setMediaPlaceReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getAllMediaPlaceReportsThunk = createAsyncThunk(
	"mediaPlaceReport/getAllThunk",
	async (payload: IReportMediaPlaceGetParams | undefined, thunkAPI) => {
		const result = await ReportService.mediaPlace.get(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setAllMediaPlaceReportsAction({list: result.data, count: result.count}));
		}
	},
	{dispatchConditionRejection: true},
);

export const deleteMediaPlaceReportThunk = createAsyncThunk(
	"mediaPlaceReport/deleteThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.mediaPlace.delete(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(deleteMediaPlaceReportAction(id));
			return result.status;
		}
	},
	{dispatchConditionRejection: true},
);
