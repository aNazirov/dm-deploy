import {api, APIReportUrl} from "../../api";
import {eReportStatusType, InsuranceReportModel, IReportGetParams, IReportInsuranceCreateParams} from "../../models";
import {Toast} from "../../utils";

export const insuranceReportService = {
	create(body: IReportInsuranceCreateParams, signal?: AbortSignal) {
		return api.post<{insuranceReport: InsuranceReportModel}>(APIReportUrl.insurance, body, {signal}).then((res) => {
			return new InsuranceReportModel(res.data.insuranceReport);
		});
	},
	get(params: IReportGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: InsuranceReportModel[]; count: number}>(APIReportUrl.insurance, {params: {params}, signal})
			.then((res) => {
				return {data: res.data.data.map((d) => new InsuranceReportModel(d)), count: res.data.count};
			});
	},
	getById(id: number, signal?: AbortSignal) {
		return api.get<InsuranceReportModel>(`${APIReportUrl.insurance}/${id}`, {signal}).then((res) => {
			return new InsuranceReportModel(res.data);
		});
	},
	update({id, body}: {id: number; body: Partial<IReportInsuranceCreateParams>}, signal?: AbortSignal) {
		return api.patch<InsuranceReportModel>(`${APIReportUrl.insurance}/${id}`, body, {signal}).then((res) => {
			return new InsuranceReportModel(res.data);
		});
	},
	updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}, signal?: AbortSignal) {
		return api
			.patch<InsuranceReportModel>(`${APIReportUrl.insurance}/status/${id}`, {statusId}, {signal})
			.then((res) => {
				if (statusId === eReportStatusType.Approved) {
					Toast.info("Принято.");
				} else if (statusId === eReportStatusType.Rejected) {
					Toast.info("Возвращено на модерацию.");
				}

				return new InsuranceReportModel(res.data);
			});
	},
	delete(id: number, signal?: AbortSignal) {
		return api.delete<{message: string; status: number}>(`${APIReportUrl.insurance}/${id}`, {signal}).then((res) => {
			Toast.success(res.data.message);
			return res.data;
		});
	},
};
