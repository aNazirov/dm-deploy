import api from "../../api";
import {eReportStatusType, IReportGetParams, IReportScienceCreateParams, ScienceReportModel} from "../../models";
import {Toast} from "../../utils";

// TODO: make endpoints as variable
export const scienceReportService = {
	create: (body: IReportScienceCreateParams, signal?: AbortSignal) => {
		return api
			.post<{scienceReport: ScienceReportModel}>("science-report", body, {signal})
			.then((res) => new ScienceReportModel(res.data.scienceReport));
	},
	get(params: IReportGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: ScienceReportModel[]; count: number}>("science-report", {
				params: {params},
				signal,
			})
			.then((res) => {
				return {data: res.data.data.map((d) => new ScienceReportModel(d)), count: res.data.count};
			});
	},
	getById(id: number, signal?: AbortSignal) {
		return api.get<ScienceReportModel>(`science-report/${id}`, {signal}).then((res) => {
			return new ScienceReportModel(res.data);
		});
	},
	update({id, body}: {id: number; body: Partial<IReportScienceCreateParams>}, signal?: AbortSignal) {
		return api.patch<ScienceReportModel>(`science-report/${id}`, body, {signal}).then((res) => {
			return new ScienceReportModel(res.data);
		});
	},
	updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}, signal?: AbortSignal) {
		return api.patch<ScienceReportModel>(`science-report/status/${id}`, {statusId}, {signal}).then((res) => {
			if (statusId === eReportStatusType.Approved) {
				Toast.info("Принято.");
			} else if (statusId === eReportStatusType.Rejected) {
				Toast.info("Возвращено на модерацию.");
			}

			return new ScienceReportModel(res.data);
		});
	},
	delete(id: number, signal?: AbortSignal) {
		return api.delete<{message: string; status: number}>(`science-report/${id}`, {signal}).then((res) => {
			Toast.success(res.data.message);
			return res.data;
		});
	},
};
