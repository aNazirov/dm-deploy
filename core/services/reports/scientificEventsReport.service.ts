import api from "../../api";
import {
	eReportStatusType,
	IReportGetParams,
	IReportScientificEventsCreateParams,
	ScientificEventsReportModel,
} from "../../models";
import {Toast} from "../../utils";

export const scientificEventsReportService = {
	create(body: IReportScientificEventsCreateParams, signal?: AbortSignal) {
		return api
			.post<{scientificEventsReport: ScientificEventsReportModel}>("scientific-events-report", body, {signal})
			.then((res) => {
				Toast.success("Успешно создано.");
				return new ScientificEventsReportModel(res.data.scientificEventsReport);
			});
	},
	get(params: IReportGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: ScientificEventsReportModel[]; count: number}>("scientific-events-report", {params: {params}, signal})
			.then((res) => {
				return {data: res.data.data.map((d) => new ScientificEventsReportModel(d)), count: res.data.count};
			});
	},
	getById(id: number, signal?: AbortSignal) {
		return api.get<ScientificEventsReportModel>(`scientific-events-report/${id}`, {signal}).then((res) => {
			return new ScientificEventsReportModel(res.data);
		});
	},
	update({id, body}: {id: number; body: Partial<IReportScientificEventsCreateParams>}, signal?: AbortSignal) {
		return api.patch<ScientificEventsReportModel>(`scientific-events-report/${id}`, body, {signal}).then((res) => {
			return new ScientificEventsReportModel(res.data);
		});
	},
	updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}, signal?: AbortSignal) {
		return api
			.patch<ScientificEventsReportModel>(`scientific-events-report/status/${id}`, {statusId}, {signal})
			.then((res) => {
				if (statusId === eReportStatusType.Approved) {
					Toast.info("Принято.");
				} else if (statusId === eReportStatusType.Rejected) {
					Toast.info("Возвращено на модерацию.");
				}

				return new ScientificEventsReportModel(res.data);
			});
	},
	delete(id: number, signal?: AbortSignal) {
		return api.delete<{message: string; status: number}>(`scientific-events-report/${id}`, {signal}).then((res) => {
			Toast.success(res.data.message);
			return res.data;
		});
	},
};
