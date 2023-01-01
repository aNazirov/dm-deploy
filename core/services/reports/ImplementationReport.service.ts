import {api, APIReportUrl} from "../../api";
import {
	eReportStatusType,
	ImplementationReportModel,
	IReportGetParams,
	IReportImplementationCreateParams,
} from "../../models";
import {Toast} from "../../utils";

export const implementationReportService = {
	create(body: IReportImplementationCreateParams, signal?: AbortSignal) {
		return api
			.post<{implementationReport: ImplementationReportModel}>(APIReportUrl.implementation, body, {signal})
			.then((res) => {
				Toast.success("Успешно создано.");
				return new ImplementationReportModel(res.data.implementationReport);
			});
	},
	get(params: IReportGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: ImplementationReportModel[]; count: number}>(APIReportUrl.implementation, {
				params: {params},
				signal,
			})
			.then((res) => {
				return {data: res.data.data.map((d) => new ImplementationReportModel(d)), count: res.data.count};
			});
	},
	getById(id: number, signal?: AbortSignal) {
		return api.get<ImplementationReportModel>(`${APIReportUrl.implementation}/${id}`, {signal}).then((res) => {
			return new ImplementationReportModel(res.data);
		});
	},
	update({id, body}: {id: number; body: Partial<IReportImplementationCreateParams>}, signal?: AbortSignal) {
		return api.patch<ImplementationReportModel>(`${APIReportUrl.implementation}/${id}`, body, {signal}).then((res) => {
			return new ImplementationReportModel(res.data);
		});
	},
	updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}, signal?: AbortSignal) {
		return api
			.patch<ImplementationReportModel>(`${APIReportUrl.implementation}/status/${id}`, {statusId}, {signal})
			.then((res) => {
				if (statusId === eReportStatusType.Approved) {
					Toast.info("Принято.");
				} else if (statusId === eReportStatusType.Rejected) {
					Toast.info("Возвращено на модерацию.");
				}

				return new ImplementationReportModel(res.data);
			});
	},
	delete(id: number, signal?: AbortSignal) {
		return api
			.delete<{message: string; status: number}>(`${APIReportUrl.implementation}/${id}`, {signal})
			.then((res) => {
				Toast.success(res.data.message);
				return res.data;
			});
	},
};
