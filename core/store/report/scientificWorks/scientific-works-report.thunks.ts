import {createAsyncThunk} from "@reduxjs/toolkit";

import {
	eReportStatusType,
	FileModel,
	IReportCreateScientificWorksParams,
	IReportGetParams,
	IReportScientificEventsCreateParams,
} from "../../../models";
import {FileService, ReportService} from "../../../services";
import {deleteFileThunk} from "../../file/file.thunks";
import {
	deleteScientificWorksReportAction,
	setAllScientificWorksReportsAction,
	setScientificWorksReportByIdAction,
} from "./scientific-works-report.slices";

export const createScientificWorksReportThunk = createAsyncThunk(
	"scientificWorksReport/createThunk",
	async ({payload, formData}: {payload: IReportCreateScientificWorksParams; formData: FormData}, thunkAPI) => {
		const files = await FileService.post(formData);

		if (files) {
			const result = await ReportService.scientificWorks.create(
				{...payload, files: files.map((f) => f.id)},
				thunkAPI.signal,
			);

			if (result) {
				thunkAPI.dispatch(setScientificWorksReportByIdAction(result));
				return result.id;
			}
		}
	},
	{dispatchConditionRejection: true},
);

export const updateScientificWorksReportThunk = createAsyncThunk(
	"scientificWorksReport/updateThunk",
	async (
		payload: {
			id: number;
			body: Partial<IReportCreateScientificWorksParams>;
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

		const result = await ReportService.scientificWorks.update(
			{...payload, body: {...payload.body, files: files.map((f) => f.id)}},
			thunkAPI.signal,
		);

		if (result) {
			thunkAPI.dispatch(setScientificWorksReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getScientificWorksReportByIdThunk = createAsyncThunk(
	"scientificWorksReport/getThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.scientificWorks.getById(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setScientificWorksReportByIdAction(result));
			return result;
		}
	},
	{dispatchConditionRejection: true},
);

export const changeStatusOfScientificWorksReportThunk = createAsyncThunk(
	"scientificWorksReport/changeStatusThunk",
	async (payload: {id: number; statusId: eReportStatusType}, thunkAPI) => {
		const result = await ReportService.scientificWorks.updateStatus(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setScientificWorksReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getAllScientificWorksReportsThunk = createAsyncThunk(
	"scientificWorksReport/getAllThunk",
	async (payload: IReportGetParams | undefined, thunkAPI) => {
		const result = await ReportService.scientificWorks.get(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setAllScientificWorksReportsAction({list: result.data, count: result.count}));
		}
	},
	{dispatchConditionRejection: true},
);

export const deleteScientificWorksReportThunk = createAsyncThunk(
	"scientificWorksReport/deleteThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.scientificWorks.delete(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(deleteScientificWorksReportAction(id));
			return result.status;
		}
	},
	{dispatchConditionRejection: true},
);
