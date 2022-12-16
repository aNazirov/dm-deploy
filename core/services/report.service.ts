import api from "../api";
import {DailyReportModel, eReportStatusType, IReportDailyCreateParams, IReportDailyGetParams} from "../models";
import {Toast} from "../utils";

export const ReportService = {
	daily: {
		create(body: IReportDailyCreateParams) {
			return api.post<{dailyReport: DailyReportModel}>("daily-report", body).then((res) => {
				Toast.success("Успешно создано.");
				return new DailyReportModel(res.data.dailyReport);
			});
		},
		get(params: IReportDailyGetParams = {take: 20, skip: 0}) {
			return api.get<{data: DailyReportModel[]; count: number}>("daily-report", {params: {params}}).then((res) => {
				return {data: res.data.data.map((d) => new DailyReportModel(d)), count: res.data.count};
			});
		},
		getById(id: number) {
			return api.get<DailyReportModel>(`daily-report/${id}`).then((res) => {
				return new DailyReportModel(res.data);
			});
		},
		update({id, body}: {id: number; body: Partial<IReportDailyCreateParams>}) {
			return api.patch(`daily-report/${id}`, body).then((res) => {
				console.log(res.data);
			});
		},
		updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}) {
			return api.patch<DailyReportModel>(`daily-report/status/${id}`, {statusId}).then((res) => {
				if (statusId === eReportStatusType.Approved) {
					Toast.info("Принято.");
				} else if (statusId === eReportStatusType.Rejected) {
					Toast.info("Возвращено на модерацию.");
				}
				console.log(res.data);
				return new DailyReportModel(res.data);
			});
		},
		delete(id: number) {
			return api.delete<{message: string; status: number}>(`daily-report/${id}`).then((res) => {
				Toast.success(res.data.message);
				return res.data;
			});
		},
	},
};
