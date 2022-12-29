import {api, APIReportUrl} from "../../api";
import {eReportStatusType, IReportGetParams, IReportMediaPlaceCreateParams, MediaPlaceReportModel} from "../../models";
import {Toast} from "../../utils";

export const mediaPlaceReportService = {
	create: (body: IReportMediaPlaceCreateParams, signal?: AbortSignal) => {
		return api
			.post<{mediaReport: MediaPlaceReportModel}>(APIReportUrl.mediaReport, body, {signal})
			.then((res) => new MediaPlaceReportModel(res.data.mediaReport));
	},
	get(params: IReportGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: MediaPlaceReportModel[]; count: number}>(APIReportUrl.mediaReport, {
				params: {params},
				signal,
			})
			.then((res) => {
				return {data: res.data.data.map((d) => new MediaPlaceReportModel(d)), count: res.data.count};
			});
	},
	getById(id: number, signal?: AbortSignal) {
		return api.get<MediaPlaceReportModel>(`${APIReportUrl.mediaReport}/${id}`, {signal}).then((res) => {
			return new MediaPlaceReportModel(res.data);
		});
	},
	update({id, body}: {id: number; body: Partial<IReportMediaPlaceCreateParams>}, signal?: AbortSignal) {
		return api.patch<MediaPlaceReportModel>(`${APIReportUrl.mediaReport}/${id}`, body, {signal}).then((res) => {
			return new MediaPlaceReportModel(res.data);
		});
	},
	updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}, signal?: AbortSignal) {
		return api
			.patch<MediaPlaceReportModel>(`${APIReportUrl.mediaReport}/status/${id}`, {statusId}, {signal})
			.then((res) => {
				if (statusId === eReportStatusType.Approved) {
					Toast.info("Принято.");
				} else if (statusId === eReportStatusType.Rejected) {
					Toast.info("Возвращено на модерацию.");
				}

				return new MediaPlaceReportModel(res.data);
			});
	},
	delete(id: number, signal?: AbortSignal) {
		return api.delete<{message: string; status: number}>(`${APIReportUrl.mediaReport}/${id}`, {signal}).then((res) => {
			Toast.success(res.data.message);
			return res.data;
		});
	},
};
