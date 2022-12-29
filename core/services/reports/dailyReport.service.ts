import {api, APIReportUrl} from "../../api";
import {DailyReportModel, eReportStatusType, IReportDailyCreateParams, IReportGetParams} from "../../models";
import {Toast} from "../../utils";

export const dailyReportService = {
	create(body: IReportDailyCreateParams, signal?: AbortSignal) {
		return api.post<{dailyReport: DailyReportModel}>(APIReportUrl.dailyReport, body, {signal}).then((res) => {
			Toast.success("Успешно создано.");
			return new DailyReportModel(res.data.dailyReport);
		});
	},
	get(params: IReportGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: DailyReportModel[]; count: number}>(APIReportUrl.dailyReport, {params: {params}, signal})
			.then((res) => {
				return {data: res.data.data.map((d) => new DailyReportModel(d)), count: res.data.count};
			});
	},
	getById(id: number, signal?: AbortSignal) {
		return api.get<DailyReportModel>(`${APIReportUrl.dailyReport}/${id}`, {signal}).then((res) => {
			return new DailyReportModel(res.data);
		});
	},
	update({id, body}: {id: number; body: Partial<IReportDailyCreateParams>}, signal?: AbortSignal) {
		return api.patch<DailyReportModel>(`${APIReportUrl.dailyReport}/${id}`, body, {signal}).then((res) => {
			return new DailyReportModel(res.data);
		});
	},
	updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}, signal?: AbortSignal) {
		return api.patch<DailyReportModel>(`${APIReportUrl.dailyReport}/status/${id}`, {statusId}, {signal}).then((res) => {
			if (statusId === eReportStatusType.Approved) {
				Toast.info("Принято.");
			} else if (statusId === eReportStatusType.Rejected) {
				Toast.info("Возвращено на модерацию.");
			}

			return new DailyReportModel(res.data);
		});
	},
	delete(id: number, signal?: AbortSignal) {
		return api.delete<{message: string; status: number}>(`${APIReportUrl.dailyReport}/${id}`, {signal}).then((res) => {
			Toast.success(res.data.message);
			return res.data;
		});
	},
};
