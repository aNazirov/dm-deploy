import {api, APIReportUrl} from "../../api";
import {DepartureReportModel, eReportStatusType, IReportDepartureCreateParams, IReportGetParams} from "../../models";
import {Toast} from "../../utils";

export const departureReportService = {
	create(body: IReportDepartureCreateParams, signal?: AbortSignal) {
		return api.post<{departureReport: DepartureReportModel}>(APIReportUrl.departure, body, {signal}).then((res) => {
			Toast.success("Успешно создано.");
			return new DepartureReportModel(res.data.departureReport);
		});
	},
	get(params: IReportGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: DepartureReportModel[]; count: number}>(APIReportUrl.departure, {
				params: {params},
				signal,
			})
			.then((res) => {
				return {data: res.data.data.map((d) => new DepartureReportModel(d)), count: res.data.count};
			});
	},
	getById(id: number, signal?: AbortSignal) {
		return api.get<DepartureReportModel>(`${APIReportUrl.departure}/${id}`, {signal}).then((res) => {
			return new DepartureReportModel(res.data);
		});
	},
	update({id, body}: {id: number; body: Partial<IReportDepartureCreateParams>}, signal?: AbortSignal) {
		return api.patch<DepartureReportModel>(`${APIReportUrl.departure}/${id}`, body, {signal}).then((res) => {
			return new DepartureReportModel(res.data);
		});
	},
	updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}, signal?: AbortSignal) {
		return api
			.patch<DepartureReportModel>(`${APIReportUrl.departure}/status/${id}`, {statusId}, {signal})
			.then((res) => {
				if (statusId === eReportStatusType.Approved) {
					Toast.info("Принято.");
				} else if (statusId === eReportStatusType.Rejected) {
					Toast.info("Возвращено на модерацию.");
				}

				return new DepartureReportModel(res.data);
			});
	},
	delete(id: number, signal?: AbortSignal) {
		return api.delete<{message: string; status: number}>(`${APIReportUrl.departure}/${id}`, {signal}).then((res) => {
			Toast.success(res.data.message);
			return res.data;
		});
	},
};
