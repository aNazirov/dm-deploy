import api from "../../api";
import {
	eReportStatusType,
	FinancialExpensesReportModel,
	IReportFinancialExpensesCreateParams,
	IReportGetParams,
} from "../../models";
import {Toast} from "../../utils";

export const financialExpensesReportService = {
	create(body: IReportFinancialExpensesCreateParams, signal?: AbortSignal) {
		return api
			.post<{financialExpensesReport: FinancialExpensesReportModel}>("financial-expenses-report", body, {signal})
			.then((res) => {
				Toast.success("Успешно создано.");
				return new FinancialExpensesReportModel(res.data.financialExpensesReport);
			});
	},
	get(params: IReportGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: FinancialExpensesReportModel[]; count: number}>("financial-expenses-report", {
				params: {params},
				signal,
			})
			.then((res) => {
				return {data: res.data.data.map((d) => new FinancialExpensesReportModel(d)), count: res.data.count};
			});
	},
	getById(id: number, signal?: AbortSignal) {
		return api.get<FinancialExpensesReportModel>(`financial-expenses-report/${id}`, {signal}).then((res) => {
			return new FinancialExpensesReportModel(res.data);
		});
	},
	update({id, body}: {id: number; body: Partial<IReportFinancialExpensesCreateParams>}, signal?: AbortSignal) {
		return api.patch<FinancialExpensesReportModel>(`financial-expenses-report/${id}`, body, {signal}).then((res) => {
			return new FinancialExpensesReportModel(res.data);
		});
	},
	updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}, signal?: AbortSignal) {
		return api
			.patch<FinancialExpensesReportModel>(`financial-expenses-report/status/${id}`, {statusId}, {signal})
			.then((res) => {
				if (statusId === eReportStatusType.Approved) {
					Toast.info("Принято.");
				} else if (statusId === eReportStatusType.Rejected) {
					Toast.info("Возвращено на модерацию.");
				}

				return new FinancialExpensesReportModel(res.data);
			});
	},
	delete(id: number, signal?: AbortSignal) {
		return api.delete<{message: string; status: number}>(`financial-expenses-report/${id}`, {signal}).then((res) => {
			Toast.success(res.data.message);
			return res.data;
		});
	},
};
