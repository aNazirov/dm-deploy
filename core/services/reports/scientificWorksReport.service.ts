import {api, APIReportUrl} from "../../api";
import {
	eReportStatusType,
	IReportCreateScientificWorksParams,
	IReportGetParams,
	ScientificWorksReportModel,
} from "../../models";
import {Toast} from "../../utils";

export const scientificWorksReportService = {
	create(body: IReportCreateScientificWorksParams, signal?: AbortSignal) {
		return api
			.post<{scientificWorksReport: ScientificWorksReportModel}>(APIReportUrl.scientificWorksReport, body, {signal})
			.then((res) => {
				Toast.success("Успешно создано.");
				return new ScientificWorksReportModel(res.data.scientificWorksReport);
			});
	},
	get(params: IReportGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: ScientificWorksReportModel[]; count: number}>(APIReportUrl.scientificWorksReport, {
				params: {params},
				signal,
			})
			.then((res) => {
				return {data: res.data.data.map((d) => new ScientificWorksReportModel(d)), count: res.data.count};
			});
	},
	getById(id: number, signal?: AbortSignal) {
		return api.get<ScientificWorksReportModel>(`${APIReportUrl.scientificWorksReport}/${id}`, {signal}).then((res) => {
			return new ScientificWorksReportModel(res.data);
		});
	},
	update({id, body}: {id: number; body: Partial<IReportCreateScientificWorksParams>}, signal?: AbortSignal) {
		return api
			.patch<ScientificWorksReportModel>(`${APIReportUrl.scientificWorksReport}/${id}`, body, {signal})
			.then((res) => {
				return new ScientificWorksReportModel(res.data);
			});
	},
	updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}, signal?: AbortSignal) {
		return api
			.patch<ScientificWorksReportModel>(`${APIReportUrl.scientificWorksReport}/status/${id}`, {statusId}, {signal})
			.then((res) => {
				if (statusId === eReportStatusType.Approved) {
					Toast.info("Принято.");
				} else if (statusId === eReportStatusType.Rejected) {
					Toast.info("Возвращено на модерацию.");
				}

				return new ScientificWorksReportModel(res.data);
			});
	},
	delete(id: number, signal?: AbortSignal) {
		return api
			.delete<{message: string; status: number}>(`${APIReportUrl.scientificWorksReport}/${id}`, {signal})
			.then((res) => {
				Toast.success(res.data.message);
				return res.data;
			});
	},
};
