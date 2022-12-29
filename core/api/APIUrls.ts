export const APIReportUrl = {
	dailyReport: "daily-report",
	financialExpensesReport: "financial-expenses-report",
	mediaReport: "media-report",
	scienceReport: "science-report",
	scientificEventsReport: "scientific-events-report",
	scientificWorksReport: "scientific-works-report",
	telemedicineReport: "telemedicine-report",
	trainingReport: "training-report",
	visitsOfForeignSpecialistsReport: "visits-of-foreign-specialists-report",
	insuranceReport: "insurance-report",
};

export const APIAuthUrl = {
	login: "auth/login",
};

export const APIUserUrl = {
	token: "user/token",
};

export const APIGlobalUrl = {
	countries: "global/countries",
	specialities: "global/specialities",
	positions: "global/positions",
};

const url = process.env.NEXT_PUBLIC_FILE_API_URL;

export const APIFileUrl = {
	uploadMany: `${url}/file/upload-many`,
};
