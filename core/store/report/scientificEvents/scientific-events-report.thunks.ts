import {createAsyncThunk} from "@reduxjs/toolkit";

import {eReportStatusType, FileModel, IReportGetParams, IReportScientificEventsCreateParams} from "../../../models";
import {FileService, ReportService} from "../../../services";
import {deleteFileThunk} from "../../file/file.thunks";
import {
	deleteScientificEventsReportAction,
	setAllScientificEventsReportsAction,
	setScientificEventsReportByIdAction,
} from "./scientific-events-report.slices";

export const createScientificEventsReportThunk = createAsyncThunk(
	"scientificEventsReport/createThunk",
	async ({payload, formData}: {payload: IReportScientificEventsCreateParams; formData: FormData}, thunkAPI) => {
		const files = await FileService.post(formData);

		if (files) {
			const result = await ReportService.scientificEvents.create(
				{...payload, files: files.map((f) => f.id)},
				thunkAPI.signal,
			);

			if (result) {
				thunkAPI.dispatch(setScientificEventsReportByIdAction(result));
				return result.id;
			}
		}
	},
	{dispatchConditionRejection: true},
);

export const updateScientificEventsReportThunk = createAsyncThunk(
	"scientificEventsReport/updateThunk",
	async (
		payload: {
			id: number;
			body: Partial<IReportScientificEventsCreateParams>;
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

		const result = await ReportService.scientificEvents.update(
			{...payload, body: {...payload.body, files: files.map((f) => f.id)}},
			thunkAPI.signal,
		);

		if (result) {
			thunkAPI.dispatch(setScientificEventsReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getScientificEventsReportByIdThunk = createAsyncThunk(
	"scientificEventsReport/getThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.scientificEvents.getById(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setScientificEventsReportByIdAction(result));
			return result;
		}
	},
	{dispatchConditionRejection: true},
);

export const changeStatusOfScientificEventsReportThunk = createAsyncThunk(
	"scientificEventsReport/changeStatusThunk",
	async (payload: {id: number; statusId: eReportStatusType}, thunkAPI) => {
		const result = await ReportService.scientificEvents.updateStatus(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setScientificEventsReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getAllScientificEventsReportsThunk = createAsyncThunk(
	"scientificEventsReport/getAllThunk",
	async (payload: IReportGetParams | undefined, thunkAPI) => {
		const result = await ReportService.scientificEvents.get(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setAllScientificEventsReportsAction({list: result.data, count: result.count}));
		}
	},
	{dispatchConditionRejection: true},
);

export const deleteScientificEventsReportThunk = createAsyncThunk(
	"scientificEventsReport/deleteThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.scientificEvents.delete(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(deleteScientificEventsReportAction(id));
			return result.status;
		}
	},
	{dispatchConditionRejection: true},
);
