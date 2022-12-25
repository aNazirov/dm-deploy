import api from "../api";
import {
	DailyReportModel,
	eReportStatusType,
	FinancialExpensesReportModel,
	IReportDailyCreateParams,
	IReportDailyGetParams,
	IReportFinancialExpensesCreateParams,
	IReportFinancialExpensesGetParams,
	IReportMediaPlaceCreateParams,
	IReportMediaPlaceGetParams,
	IReportTelemedicineCreateParams,
	IReportTelemedicineGetParams,
	IReportTrainingCreateParams,
	IReportTrainingGetParams,
	IReportVisitsOfForeignSpecialistsCreateParams,
	IReportVisitsOfForeignSpecialistsGetParams,
	MediaPlaceReportModel,
	TelemedicineReportModel,
	TrainingReportModel,
	VisitsOfForeignSpecialistsModel,
} from "../models";
import {Toast} from "../utils";

/* Daily Report */
const dailyReport = {
	create(body: IReportDailyCreateParams, signal?: AbortSignal) {
		return api.post<{dailyReport: DailyReportModel}>("daily-report", body, {signal}).then((res) => {
			Toast.success("Успешно создано.");
			return new DailyReportModel(res.data.dailyReport);
		});
	},
	get(params: IReportDailyGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: DailyReportModel[]; count: number}>("daily-report", {params: {params}, signal})
			.then((res) => {
				return {data: res.data.data.map((d) => new DailyReportModel(d)), count: res.data.count};
			});
	},
	getById(id: number, signal?: AbortSignal) {
		return api.get<DailyReportModel>(`daily-report/${id}`, {signal}).then((res) => {
			return new DailyReportModel(res.data);
		});
	},
	update({id, body}: {id: number; body: Partial<IReportDailyCreateParams>}, signal?: AbortSignal) {
		return api.patch<DailyReportModel>(`daily-report/${id}`, body, {signal}).then((res) => {
			return new DailyReportModel(res.data);
		});
	},
	updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}, signal?: AbortSignal) {
		return api.patch<DailyReportModel>(`daily-report/status/${id}`, {statusId}, {signal}).then((res) => {
			if (statusId === eReportStatusType.Approved) {
				Toast.info("Принято.");
			} else if (statusId === eReportStatusType.Rejected) {
				Toast.info("Возвращено на модерацию.");
			}

			return new DailyReportModel(res.data);
		});
	},
	delete(id: number, signal?: AbortSignal) {
		return api.delete<{message: string; status: number}>(`daily-report/${id}`, {signal}).then((res) => {
			Toast.success(res.data.message);
			return res.data;
		});
	},
};

/* Training Report */
const trainingReport = {
	create(body: IReportTrainingCreateParams, signal?: AbortSignal) {
		return api.post<{trainingReport: TrainingReportModel}>("training-report", body, {signal}).then((res) => {
			Toast.success("Успешно создано.");
			return new TrainingReportModel(res.data.trainingReport);
		});
	},
	get(params: IReportTrainingGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: TrainingReportModel[]; count: number}>("training-report", {params: {params}, signal})
			.then((res) => {
				return {data: res.data.data.map((d) => new TrainingReportModel(d)), count: res.data.count};
			});
	},
	getById(id: number, signal?: AbortSignal) {
		return api.get<TrainingReportModel>(`training-report/${id}`, {signal}).then((res) => {
			return new TrainingReportModel(res.data);
		});
	},
	update({id, body}: {id: number; body: Partial<IReportTrainingCreateParams>}, signal?: AbortSignal) {
		return api.patch<TrainingReportModel>(`training-report/${id}`, body, {signal}).then((res) => {
			return new TrainingReportModel(res.data);
		});
	},
	updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}, signal?: AbortSignal) {
		return api.patch<TrainingReportModel>(`training-report/status/${id}`, {statusId}, {signal}).then((res) => {
			if (statusId === eReportStatusType.Approved) {
				Toast.info("Принято.");
			} else if (statusId === eReportStatusType.Rejected) {
				Toast.info("Возвращено на модерацию.");
			}

			return new TrainingReportModel(res.data);
		});
	},
	delete(id: number, signal?: AbortSignal) {
		return api.delete<{message: string; status: number}>(`training-report/${id}`, {signal}).then((res) => {
			Toast.success(res.data.message);
			return res.data;
		});
	},
};

/* Financial Expenses Report */
const financialExpensesReport = {
	create(body: IReportFinancialExpensesCreateParams, signal?: AbortSignal) {
		return api
			.post<{financialExpensesReport: FinancialExpensesReportModel}>("financial-expenses-report", body, {signal})
			.then((res) => {
				Toast.success("Успешно создано.");
				return new FinancialExpensesReportModel(res.data.financialExpensesReport);
			});
	},
	get(params: IReportFinancialExpensesGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: FinancialExpensesReportModel[]; count: number}>("financial-expenses-report", {
				params: {params},
				signal,
			})
			.then((res) => {
				return {data: res.data.data.map((d) => new FinancialExpensesReportModel(d)), count: res.data.count};
			});
	},
	getById(id: number, signal?: AbortSignal) {
		return api.get<FinancialExpensesReportModel>(`financial-expenses-report/${id}`, {signal}).then((res) => {
			return new FinancialExpensesReportModel(res.data);
		});
	},
	update({id, body}: {id: number; body: Partial<IReportFinancialExpensesCreateParams>}, signal?: AbortSignal) {
		return api.patch<FinancialExpensesReportModel>(`financial-expenses-report/${id}`, body, {signal}).then((res) => {
			return new FinancialExpensesReportModel(res.data);
		});
	},
	updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}, signal?: AbortSignal) {
		return api
			.patch<FinancialExpensesReportModel>(`financial-expenses-report/status/${id}`, {statusId}, {signal})
			.then((res) => {
				if (statusId === eReportStatusType.Approved) {
					Toast.info("Принято.");
				} else if (statusId === eReportStatusType.Rejected) {
					Toast.info("Возвращено на модерацию.");
				}

				return new FinancialExpensesReportModel(res.data);
			});
	},
	delete(id: number, signal?: AbortSignal) {
		return api.delete<{message: string; status: number}>(`financial-expenses-report/${id}`, {signal}).then((res) => {
			Toast.success(res.data.message);
			return res.data;
		});
	},
};

/* Telemedicine report */
const telemedicineReport = {
	create: (body: IReportTelemedicineCreateParams, signal?: AbortSignal) => {
		return api
			.post<{telemedicineReport: TelemedicineReportModel}>("telemedicine-report", body, {signal})
			.then((res) => new TelemedicineReportModel(res.data.telemedicineReport));
	},
	get(params: IReportTelemedicineGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: TelemedicineReportModel[]; count: number}>("telemedicine-report", {
				params: {params},
				signal,
			})
			.then((res) => {
				return {data: res.data.data.map((d) => new TelemedicineReportModel(d)), count: res.data.count};
			});
	},
	getById(id: number, signal?: AbortSignal) {
		return api.get<TelemedicineReportModel>(`telemedicine-report/${id}`, {signal}).then((res) => {
			return new TelemedicineReportModel(res.data);
		});
	},
	update({id, body}: {id: number; body: Partial<IReportTelemedicineCreateParams>}, signal?: AbortSignal) {
		return api.patch<TelemedicineReportModel>(`telemedicine-report/${id}`, body, {signal}).then((res) => {
			return new TelemedicineReportModel(res.data);
		});
	},
	updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}, signal?: AbortSignal) {
		return api.patch<TelemedicineReportModel>(`telemedicine-report/status/${id}`, {statusId}, {signal}).then((res) => {
			if (statusId === eReportStatusType.Approved) {
				Toast.info("Принято.");
			} else if (statusId === eReportStatusType.Rejected) {
				Toast.info("Возвращено на модерацию.");
			}

			return new TelemedicineReportModel(res.data);
		});
	},
	delete(id: number, signal?: AbortSignal) {
		return api.delete<{message: string; status: number}>(`telemedicine-report/${id}`, {signal}).then((res) => {
			Toast.success(res.data.message);
			return res.data;
		});
	},
};

/* VisitForeignSpecialists report */
const visitForeignSpecialistsReport = {
	create: (body: IReportVisitsOfForeignSpecialistsCreateParams, signal?: AbortSignal) => {
		return api
			.post<{visitsOfForeignSpecialistsReport: VisitsOfForeignSpecialistsModel}>(
				"visits-of-foreign-specialists-report",
				body,
				{signal},
			)
			.then((res) => new VisitsOfForeignSpecialistsModel(res.data.visitsOfForeignSpecialistsReport));
	},
	get(params: IReportVisitsOfForeignSpecialistsGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
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

/* MediaPlace report */
const mediaPlaceReport = {
	create: (body: IReportMediaPlaceCreateParams, signal?: AbortSignal) => {
		return api
			.post<{mediaPlaceReport: MediaPlaceReportModel}>("media-report", body, {signal})
			.then((res) => new MediaPlaceReportModel(res.data.mediaPlaceReport));
	},
	get(params: IReportMediaPlaceGetParams = {take: 20, skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: MediaPlaceReportModel[]; count: number}>("media-report", {
				params: {params},
				signal,
			})
			.then((res) => {
				return {data: res.data.data.map((d) => new MediaPlaceReportModel(d)), count: res.data.count};
			});
	},
	getById(id: number, signal?: AbortSignal) {
		return api.get<MediaPlaceReportModel>(`media-report/${id}`, {signal}).then((res) => {
			return new MediaPlaceReportModel(res.data);
		});
	},
	update({id, body}: {id: number; body: Partial<IReportMediaPlaceCreateParams>}, signal?: AbortSignal) {
		return api.patch<MediaPlaceReportModel>(`media-report/${id}`, body, {signal}).then((res) => {
			return new MediaPlaceReportModel(res.data);
		});
	},
	updateStatus({id, statusId}: {id: number; statusId: eReportStatusType}, signal?: AbortSignal) {
		return api.patch<MediaPlaceReportModel>(`media-report/status/${id}`, {statusId}, {signal}).then((res) => {
			if (statusId === eReportStatusType.Approved) {
				Toast.info("Принято.");
			} else if (statusId === eReportStatusType.Rejected) {
				Toast.info("Возвращено на модерацию.");
			}

			return new MediaPlaceReportModel(res.data);
		});
	},
	delete(id: number, signal?: AbortSignal) {
		return api.delete<{message: string; status: number}>(`media-report/${id}`, {signal}).then((res) => {
			Toast.success(res.data.message);
			return res.data;
		});
	},
};

export const ReportService = {
	daily: dailyReport,
	training: trainingReport,
	financialExpenses: financialExpensesReport,
	telemedicine: telemedicineReport,
	visitForeignSpecialists: visitForeignSpecialistsReport,
	mediaPlace: mediaPlaceReport,
};
