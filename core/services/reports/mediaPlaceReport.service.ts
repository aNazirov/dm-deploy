import api from "../../api";
import {eReportStatusType, IReportGetParams, IReportMediaPlaceCreateParams, MediaPlaceReportModel} from "../../models";
import {Toast} from "../../utils";

export const mediaPlaceReportService = {
	create: (body: IReportMediaPlaceCreateParams, signal?: AbortSignal) => {
		return api
			.post<{mediaReport: MediaPlaceReportModel}>("media-report", body, {signal})
			.then((res) => new MediaPlaceReportModel(res.data.mediaReport));
	},
	get(params: IReportGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: MediaPlaceReportModel[]; count: number}>("media-report", {
				params: {params},
				signal,
			})
			.then((res) => {
				return {data: res.data.data.map((d) => new MediaPlaceReportModel(d)), count: res.data.count};
			});
	},
	getById(id: number, signal?: AbortSignal) {
		return api.get<MediaPlaceReportModel>(`media-report/${id}`, {signal}).then((res) => {
			return new MediaPlaceReportModel(res.data);
		});
	},
	update({id, body}: {id: number; body: Partial<IReportMediaPlaceCreateParams>}, signal?: AbortSignal) {
		return api.patch<MediaPlaceReportModel>(`media-report/${id}`, body, {signal}).then((res) => {
			return new MediaPlaceReportModel(res.data);
		});
	},
	updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}, signal?: AbortSignal) {
		return api.patch<MediaPlaceReportModel>(`media-report/status/${id}`, {statusId}, {signal}).then((res) => {
			if (statusId === eReportStatusType.Approved) {
				Toast.info("Принято.");
			} else if (statusId === eReportStatusType.Rejected) {
				Toast.info("Возвращено на модерацию.");
			}

			return new MediaPlaceReportModel(res.data);
		});
	},
	delete(id: number, signal?: AbortSignal) {
		return api.delete<{message: string; status: number}>(`media-report/${id}`, {signal}).then((res) => {
			Toast.success(res.data.message);
			return res.data;
		});
	},
};
