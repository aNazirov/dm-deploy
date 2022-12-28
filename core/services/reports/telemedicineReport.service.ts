import api from "../../api";
import {
	eReportStatusType,
	IReportGetParams,
	IReportTelemedicineCreateParams,
	TelemedicineReportModel,
} from "../../models";
import {Toast} from "../../utils";

export const telemedicineReportService = {
	create: (body: IReportTelemedicineCreateParams, signal?: AbortSignal) => {
		return api
			.post<{telemedicineReport: TelemedicineReportModel}>("telemedicine-report", body, {signal})
			.then((res) => new TelemedicineReportModel(res.data.telemedicineReport));
	},
	get(params: IReportGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: TelemedicineReportModel[]; count: number}>("telemedicine-report", {
				params: {params},
				signal,
			})
			.then((res) => {
				return {data: res.data.data.map((d) => new TelemedicineReportModel(d)), count: res.data.count};
			});
	},
	getById(id: number, signal?: AbortSignal) {
		return api.get<TelemedicineReportModel>(`telemedicine-report/${id}`, {signal}).then((res) => {
			return new TelemedicineReportModel(res.data);
		});
	},
	update({id, body}: {id: number; body: Partial<IReportTelemedicineCreateParams>}, signal?: AbortSignal) {
		return api.patch<TelemedicineReportModel>(`telemedicine-report/${id}`, body, {signal}).then((res) => {
			return new TelemedicineReportModel(res.data);
		});
	},
	updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}, signal?: AbortSignal) {
		return api.patch<TelemedicineReportModel>(`telemedicine-report/status/${id}`, {statusId}, {signal}).then((res) => {
			if (statusId === eReportStatusType.Approved) {
				Toast.info("Принято.");
			} else if (statusId === eReportStatusType.Rejected) {
				Toast.info("Возвращено на модерацию.");
			}

			return new TelemedicineReportModel(res.data);
		});
	},
	delete(id: number, signal?: AbortSignal) {
		return api.delete<{message: string; status: number}>(`telemedicine-report/${id}`, {signal}).then((res) => {
			Toast.success(res.data.message);
			return res.data;
		});
	},
};
