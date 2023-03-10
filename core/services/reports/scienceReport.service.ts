import {api, APIReportUrl} from "../../api";
import {eReportStatusType, IReportGetParams, IReportScienceCreateParams, ScienceReportModel} from "../../models";
import {Toast} from "../../utils";

// TODO: make endpoints as variable
export const scienceReportService = {
	create: (body: IReportScienceCreateParams, signal?: AbortSignal) => {
		return api
			.post<{scienceReport: ScienceReportModel}>(APIReportUrl.science, body, {signal})
			.then((res) => new ScienceReportModel(res.data.scienceReport));
	},
	get(params: IReportGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: ScienceReportModel[]; count: number}>(APIReportUrl.science, {
				params: {params},
				signal,
			})
			.then((res) => {
				return {data: res.data.data.map((d) => new ScienceReportModel(d)), count: res.data.count};
			});
	},
	getById(id: number, signal?: AbortSignal) {
		return api.get<ScienceReportModel>(`${APIReportUrl.science}/${id}`, {signal}).then((res) => {
			return new ScienceReportModel(res.data);
		});
	},
	update({id, body}: {id: number; body: Partial<IReportScienceCreateParams>}, signal?: AbortSignal) {
		return api.patch<ScienceReportModel>(`${APIReportUrl.science}/${id}`, body, {signal}).then((res) => {
			return new ScienceReportModel(res.data);
		});
	},
	updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}, signal?: AbortSignal) {
		return api.patch<ScienceReportModel>(`${APIReportUrl.science}/status/${id}`, {statusId}, {signal}).then((res) => {
			if (statusId === eReportStatusType.Approved) {
				Toast.info("Принято.");
			} else if (statusId === eReportStatusType.Rejected) {
				Toast.info("Возвращено на модерацию.");
			}

			return new ScienceReportModel(res.data);
		});
	},
	delete(id: number, signal?: AbortSignal) {
		return api.delete<{message: string; status: number}>(`${APIReportUrl.science}/${id}`, {signal}).then((res) => {
			Toast.success(res.data.message);
			return res.data;
		});
	},
	deletePart(id: number, signal?: AbortSignal) {
		return api
			.delete(`${APIReportUrl.science}/part/${id}`, {signal}, {pending: false, success: false})
			.then((res) => res.data);
	},
};
