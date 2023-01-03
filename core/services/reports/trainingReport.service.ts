import {api, APIReportUrl} from "../../api";
import {eReportStatusType, IReportGetParams, IReportTrainingCreateParams, TrainingReportModel} from "../../models";
import {Toast} from "../../utils";

export const trainingReportService = {
	create(body: IReportTrainingCreateParams, signal?: AbortSignal) {
		return api.post<{trainingReport: TrainingReportModel}>(APIReportUrl.training, body, {signal}).then((res) => {
			return new TrainingReportModel(res.data.trainingReport);
		});
	},
	get(params: IReportGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: TrainingReportModel[]; count: number}>(APIReportUrl.training, {params: {params}, signal})
			.then((res) => {
				return {data: res.data.data.map((d) => new TrainingReportModel(d)), count: res.data.count};
			});
	},
	getById(id: number, signal?: AbortSignal) {
		return api.get<TrainingReportModel>(`${APIReportUrl.training}/${id}`, {signal}).then((res) => {
			return new TrainingReportModel(res.data);
		});
	},
	update({id, body}: {id: number; body: Partial<IReportTrainingCreateParams>}, signal?: AbortSignal) {
		return api.patch<TrainingReportModel>(`${APIReportUrl.training}/${id}`, body, {signal}).then((res) => {
			return new TrainingReportModel(res.data);
		});
	},
	updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}, signal?: AbortSignal) {
		return api.patch<TrainingReportModel>(`${APIReportUrl.training}/status/${id}`, {statusId}, {signal}).then((res) => {
			if (statusId === eReportStatusType.Approved) {
				Toast.info("Принято.");
			} else if (statusId === eReportStatusType.Rejected) {
				Toast.info("Возвращено на модерацию.");
			}

			return new TrainingReportModel(res.data);
		});
	},
	delete(id: number, signal?: AbortSignal) {
		return api.delete<{message: string; status: number}>(`${APIReportUrl.training}/${id}`, {signal}).then((res) => {
			Toast.success(res.data.message);
			return res.data;
		});
	},
};
