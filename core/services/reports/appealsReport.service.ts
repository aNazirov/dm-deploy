import {api, APIReportUrl} from "../../api";
import {AppealsReportModel, eReportStatusType, IReportAppealsCreateParams, IReportGetParams} from "../../models";
import {Toast} from "../../utils";

export const appealsReportService = {
	create(body: IReportAppealsCreateParams, signal?: AbortSignal) {
		return api.post<{appealsReport: AppealsReportModel}>(APIReportUrl.appeals, body, {signal}).then((res) => {
			Toast.success("Успешно создано.");
			return new AppealsReportModel(res.data.appealsReport);
		});
	},
	get(params: IReportGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: AppealsReportModel[]; count: number}>(APIReportUrl.appeals, {params: {params}, signal})
			.then((res) => {
				return {data: res.data.data.map((d) => new AppealsReportModel(d)), count: res.data.count};
			});
	},
	getById(id: number, signal?: AbortSignal) {
		return api.get<AppealsReportModel>(`${APIReportUrl.appeals}/${id}`, {signal}).then((res) => {
			return new AppealsReportModel(res.data);
		});
	},
	update({id, body}: {id: number; body: Partial<IReportAppealsCreateParams>}, signal?: AbortSignal) {
		return api.patch<AppealsReportModel>(`${APIReportUrl.appeals}/${id}`, body, {signal}).then((res) => {
			return new AppealsReportModel(res.data);
		});
	},
	updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}, signal?: AbortSignal) {
		return api.patch<AppealsReportModel>(`${APIReportUrl.appeals}/status/${id}`, {statusId}, {signal}).then((res) => {
			if (statusId === eReportStatusType.Approved) {
				Toast.info("Принято.");
			} else if (statusId === eReportStatusType.Rejected) {
				Toast.info("Возвращено на модерацию.");
			}

			return new AppealsReportModel(res.data);
		});
	},
	delete(id: number, signal?: AbortSignal) {
		return api.delete<{message: string; status: number}>(`${APIReportUrl.appeals}/${id}`, {signal}).then((res) => {
			Toast.success(res.data.message);
			return res.data;
		});
	},
};
