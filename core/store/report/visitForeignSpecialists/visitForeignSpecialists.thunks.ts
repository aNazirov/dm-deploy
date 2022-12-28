import {createAsyncThunk} from "@reduxjs/toolkit";

import {eReportStatusType, IReportGetParams, IReportVisitsOfForeignSpecialistsCreateParams} from "../../../models";
import {FileService, ReportService} from "../../../services";
import {
	deleteVisitForeignSpecialistsReportAction,
	setAllVisitForeignSpecialistsReportsAction,
	setVisitForeignSpecialistsReportByIdAction,
} from "./visitForeignSpecialists.slices";

export const createVisitForeignSpecialistsReportThunk = createAsyncThunk(
	"visitForeignSpecialistsReport/createThunk",
	async (
		{payload, formData}: {payload: IReportVisitsOfForeignSpecialistsCreateParams; formData: FormData},
		thunkAPI,
	) => {
		const files = await FileService.post(formData);

		if (files && files.length) {
			const reportsWithFile = payload.visitsOfForeignSpecialists.map((v, i) => ({...v, fileId: files[i].id}));

			const result = await ReportService.visitForeignSpecialists.create(
				{visitsOfForeignSpecialists: reportsWithFile},
				thunkAPI.signal,
			);

			if (result) {
				thunkAPI.dispatch(setVisitForeignSpecialistsReportByIdAction(result));

				return result.id;
			}
		}
	},
	{dispatchConditionRejection: true},
);

export const getVisitForeignSpecialistsReportByIdThunk = createAsyncThunk(
	"visitForeignSpecialistsReport/getThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.visitForeignSpecialists.getById(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setVisitForeignSpecialistsReportByIdAction(result));
		}
	},
	{dispatchConditionRejection: true},
);

export const changeStatusOfVisitForeignSpecialistsReportThunk = createAsyncThunk(
	"visitForeignSpecialistsReport/changeStatusThunk",
	async (payload: {id: number; statusId: eReportStatusType}, thunkAPI) => {
		const result = await ReportService.visitForeignSpecialists.updateStatus(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setVisitForeignSpecialistsReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getAllVisitForeignSpecialistsReportsThunk = createAsyncThunk(
	"visitForeignSpecialistsReport/getAllThunk",
	async (payload: IReportGetParams | undefined, thunkAPI) => {
		const result = await ReportService.visitForeignSpecialists.get(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setAllVisitForeignSpecialistsReportsAction({list: result.data, count: result.count}));
		}
	},
	{dispatchConditionRejection: true},
);

export const deleteVisitForeignSpecialistsReportThunk = createAsyncThunk(
	"visitForeignSpecialistsReport/deleteThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.visitForeignSpecialists.delete(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(deleteVisitForeignSpecialistsReportAction(id));
			return result.status;
		}
	},
	{dispatchConditionRejection: true},
);
