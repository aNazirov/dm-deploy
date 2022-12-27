import {createAsyncThunk} from "@reduxjs/toolkit";

import {
	eReportStatusType,
	IReportFinancialExpensesCreateParams,
	IReportFinancialExpensesGetParams,
} from "../../../models";
import {ReportService} from "../../../services";
import {
	deleteFinancialExpensesReportAction,
	setAllFinancialExpensesReportsAction,
	setFinancialExpenseReportByIdAction,
} from "./financial-expenses-report.slices";

export const createFinancialExpensesReportThunk = createAsyncThunk(
	"financialExpensesReport/createThunk",
	async (payload: IReportFinancialExpensesCreateParams, thunkAPI) => {
		const result = await ReportService.financialExpenses.create(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setFinancialExpenseReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getFinancialExpensesReportByIdThunk = createAsyncThunk(
	"financialExpensesReport/getThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.financialExpenses.getById(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setFinancialExpenseReportByIdAction(result));
		}
	},
	{dispatchConditionRejection: true},
);

export const changeStatusOfFinancialExpensesReportThunk = createAsyncThunk(
	"financialExpensesReport/changeStatusThunk",
	async (payload: {id: number; statusId: eReportStatusType}, thunkAPI) => {
		const result = await ReportService.financialExpenses.updateStatus(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setFinancialExpenseReportByIdAction(result));
			return result.id;
		}
	},
	{dispatchConditionRejection: true},
);

export const getAllFinancialExpensesReportsThunk = createAsyncThunk(
	"financialExpensesReport/getAllThunk",
	async (payload: IReportFinancialExpensesGetParams | undefined, thunkAPI) => {
		const result = await ReportService.financialExpenses.get(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setAllFinancialExpensesReportsAction({list: result.data, count: result.count}));
		}
	},
	{dispatchConditionRejection: true},
);

export const deleteFinancialExpensesReportThunk = createAsyncThunk(
	"financialExpensesReport/deleteThunk",
	async (id: number, thunkAPI) => {
		const result = await ReportService.financialExpenses.delete(id, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(deleteFinancialExpensesReportAction(id));
			return result.status;
		}
	},
	{dispatchConditionRejection: true},
);
