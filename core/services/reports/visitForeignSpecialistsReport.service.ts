import api from "../../api";
import {
	eReportStatusType,
	IReportGetParams,
	IReportVisitsOfForeignSpecialistsCreateParams,
	VisitsOfForeignSpecialistsModel,
} from "../../models";
import {Toast} from "../../utils";

export const visitForeignSpecialistsReportService = {
	create: (body: IReportVisitsOfForeignSpecialistsCreateParams, signal?: AbortSignal) => {
		return api
			.post<{visitsOfForeignSpecialistsReport: VisitsOfForeignSpecialistsModel}>(
				"visits-of-foreign-specialists-report",
				body,
				{signal},
			)
			.then((res) => new VisitsOfForeignSpecialistsModel(res.data.visitsOfForeignSpecialistsReport));
	},
	get(params: IReportGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: VisitsOfForeignSpecialistsModel[]; count: number}>("visits-of-foreign-specialists-report", {
				params: {params},
				signal,
			})
			.then((res) => {
				return {data: res.data.data.map((d) => new VisitsOfForeignSpecialistsModel(d)), count: res.data.count};
			});
	},
	getById(id: number, signal?: AbortSignal) {
		return api
			.get<VisitsOfForeignSpecialistsModel>(`visits-of-foreign-specialists-report/${id}`, {signal})
			.then((res) => {
				return new VisitsOfForeignSpecialistsModel(res.data);
			});
	},
	update({id, body}: {id: number; body: Partial<IReportVisitsOfForeignSpecialistsCreateParams>}, signal?: AbortSignal) {
		return api
			.patch<VisitsOfForeignSpecialistsModel>(`visits-of-foreign-specialists-report/${id}`, body, {signal})
			.then((res) => {
				return new VisitsOfForeignSpecialistsModel(res.data);
			});
	},
	updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}, signal?: AbortSignal) {
		return api
			.patch<VisitsOfForeignSpecialistsModel>(`visits-of-foreign-specialists-report/status/${id}`, {statusId}, {signal})
			.then((res) => {
				if (statusId === eReportStatusType.Approved) {
					Toast.info("Принято.");
				} else if (statusId === eReportStatusType.Rejected) {
					Toast.info("Возвращено на модерацию.");
				}

				return new VisitsOfForeignSpecialistsModel(res.data);
			});
	},
	delete(id: number, signal?: AbortSignal) {
		return api
			.delete<{message: string; status: number}>(`visits-of-foreign-specialists-report/${id}`, {signal})
			.then((res) => {
				Toast.success(res.data.message);
				return res.data;
			});
	},
};
