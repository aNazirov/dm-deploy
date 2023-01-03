import {createAsyncThunk} from "@reduxjs/toolkit";

import {eReportStatusType, FileModel, IReportGetParams, IReportMediaPlaceCreateParams} from "../../../models";
import {FileService, ReportService} from "../../../services";
import {deleteFileThunk} from "../../file/file.thunks";
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

export const updateMediaPlaceReportThunk = createAsyncThunk(
	"mediaPlaceReport/updateThunk",
	async (
		{
			payload,
			formData,
		}: {
			payload: {
				id: number;
				body: Partial<IReportMediaPlaceCreateParams>;
				deletingPartsIds?: number[];
				deletingFilesIds?: number[];
			};
			formData?: FormData;
		},
		thunkAPI,
	) => {
		const files = payload.body.mediaParts?.filter((p) => p.file).map((p) => p.file) ?? [];

		payload.deletingFilesIds?.forEach((id) => thunkAPI.dispatch(deleteFileThunk(id)));
		payload.deletingPartsIds?.forEach((id) => ReportService.implementation.deletePart(id, thunkAPI.signal));

		if (formData) {
			files.push(...(await FileService.post(formData)));
		}
		console.log(payload.body.mediaParts);
		console.log(files);
		const reportsWithFile = payload.body.mediaParts?.map((v, i) => ({...v, fileId: files[i].id}));
		console.log(formData);

		const result = await ReportService.mediaPlace.update(
			{id: payload.id, body: {...payload.body, mediaParts: reportsWithFile ?? []}},
			thunkAPI.signal,
		);

		if (result) {
			thunkAPI.dispatch(setMediaPlaceReportByIdAction(result));
			return result.id;
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
			return result;
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
	async (payload: IReportGetParams | undefined, thunkAPI) => {
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
