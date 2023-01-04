export const APIReportUrl = {
	daily: "daily-report",
	financialExpenses: "financial-expenses-report",
	media: "media-report",
	science: "science-report",
	scientificEvents: "scientific-events-report",
	scientificWorks: "scientific-works-report",
	telemedicine: "telemedicine-report",
	training: "training-report",
	visitsOfForeignSpecialists: "visits-of-foreign-specialists-report",
	insurance: "insurance-report",
	implementation: "implementation-report",
	departure: "departure-report",
	appeals: "appeals-report",
};

const SET_OF_REPORTS = "set-of-reports";
const EXPORT_REPORT = "export";

export const APISetOfReportsUrl = {
	daily: `${APIReportUrl.daily}/${SET_OF_REPORTS}`,
	financialExpenses: `${APIReportUrl.financialExpenses}/${SET_OF_REPORTS}`,
	media: `${APIReportUrl.media}/${SET_OF_REPORTS}`,
	science: `${APIReportUrl.science}/${SET_OF_REPORTS}`,
	scientificEvents: `${APIReportUrl.scientificEvents}/${SET_OF_REPORTS}`,
	scientificWorks: `${APIReportUrl.scientificWorks}/${SET_OF_REPORTS}`,
	telemedicine: `${APIReportUrl.telemedicine}/${SET_OF_REPORTS}`,
	training: `${APIReportUrl.training}/${SET_OF_REPORTS}`,
	visitsOfForeignSpecialists: `${APIReportUrl.visitsOfForeignSpecialists}/${SET_OF_REPORTS}`,
	insurance: `${APIReportUrl.insurance}/${SET_OF_REPORTS}`,
	implementation: `${APIReportUrl.implementation}/${SET_OF_REPORTS}`,
	departure: `${APIReportUrl.departure}/${SET_OF_REPORTS}`,
	appeals: `${APIReportUrl.appeals}/${SET_OF_REPORTS}`,
};

export const APISetOfReportsExportUrl = {
	daily: `${APIReportUrl.daily}/${EXPORT_REPORT}`,
	financialExpenses: `${APIReportUrl.financialExpenses}/${EXPORT_REPORT}`,
	media: `${APIReportUrl.media}/${EXPORT_REPORT}`,
	science: `${APIReportUrl.science}/${EXPORT_REPORT}`,
	scientificEvents: `${APIReportUrl.scientificEvents}/${EXPORT_REPORT}`,
	scientificWorks: `${APIReportUrl.scientificWorks}/${EXPORT_REPORT}`,
	telemedicine: `${APIReportUrl.telemedicine}/${EXPORT_REPORT}`,
	training: `${APIReportUrl.training}/${EXPORT_REPORT}`,
	visitsOfForeignSpecialists: `${APIReportUrl.visitsOfForeignSpecialists}/${EXPORT_REPORT}`,
	insurance: `${APIReportUrl.insurance}/${EXPORT_REPORT}`,
	implementation: `${APIReportUrl.implementation}/${EXPORT_REPORT}`,
	departure: `${APIReportUrl.departure}/${EXPORT_REPORT}`,
	appeals: `${APIReportUrl.appeals}/${EXPORT_REPORT}`,
};

export const APIAuthUrl = {
	login: "auth/login",
};

export const APIUserUrl = {
	user: "user",
	token: "user/token",
};

export const APIGlobalUrl = {
	autoComplete: "global/autocomplete",
	uncheckedReportsCount: "global/count-of-unchecked-reports",
};

const url = process.env.NEXT_PUBLIC_FILE_API_URL;

export const APIFileUrl = {
	uploadMany: `${url}/file/upload-many`,
	delete: `${url}/file`,
};
