import {api, APIReportUrl} from "../../api";
import {eReportStatusType, IReportGetParams, IReportMediaPlaceCreateParams, MediaPlaceReportModel} from "../../models";
import {Toast} from "../../utils";

export const mediaPlaceReportService = {
	create: (body: IReportMediaPlaceCreateParams, signal?: AbortSignal) => {
		return api
			.post<{mediaReport: MediaPlaceReportModel}>(APIReportUrl.media, body, {signal})
			.then((res) => new MediaPlaceReportModel(res.data.mediaReport));
	},
	get(params: IReportGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: MediaPlaceReportModel[]; count: number}>(APIReportUrl.media, {
				params: {params},
				signal,
			})
			.then((res) => {
				return {data: res.data.data.map((d) => new MediaPlaceReportModel(d)), count: res.data.count};
			});
	},
	getById(id: number, signal?: AbortSignal) {
		return api.get<MediaPlaceReportModel>(`${APIReportUrl.media}/${id}`, {signal}).then((res) => {
			return new MediaPlaceReportModel(res.data);
		});
	},
	update({id, body}: {id: number; body: Partial<IReportMediaPlaceCreateParams>}, signal?: AbortSignal) {
		console.log("reached");
		return api.patch<MediaPlaceReportModel>(`${APIReportUrl.media}/${id}`, body, {signal}).then((res) => {
			return new MediaPlaceReportModel(res.data);
		});
	},
	updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}, signal?: AbortSignal) {
		return api.patch<MediaPlaceReportModel>(`${APIReportUrl.media}/status/${id}`, {statusId}, {signal}).then((res) => {
			if (statusId === eReportStatusType.Approved) {
				Toast.info("Принято.");
			} else if (statusId === eReportStatusType.Rejected) {
				Toast.info("Возвращено на модерацию.");
			}

			return new MediaPlaceReportModel(res.data);
		});
	},
	delete(id: number, signal?: AbortSignal) {
		return api.delete<{message: string; status: number}>(`${APIReportUrl.media}/${id}`, {signal}).then((res) => {
			Toast.success(res.data.message);
			return res.data;
		});
	},
};
