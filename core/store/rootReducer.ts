import {
	ActionFromReducersMapObject,
	CombinedState,
	combineReducers,
	Reducer,
	StateFromReducersMapObject,
} from "@reduxjs/toolkit";

import {fileReducer} from "./file/file.slices";
import {globalReducer} from "./global/global.slices";
import {appealsReportReducer} from "./report/appeals/appeals-report.slices";
import {dailyReportReducer} from "./report/daily/daily-report.slices";
import {departureReportReducer} from "./report/departure/departure-report.slices";
import {financialExpensesReportReducer} from "./report/financialExpenses/financial-expenses-report.slices";
import {implementationReportReducer} from "./report/implementation/implementation-report.slices";
import {insuranceReportReducer} from "./report/insurance/insurance-report.slices";
import {mediaPlaceReportReducer} from "./report/mediaPlace/mediaPlace.slices";
import {scienceReportReducer} from "./report/science/science.slices";
import {scientificEventsReportReducer} from "./report/scientificEvents/scientific-events-report.slices";
import {scientificWorksReportReducer} from "./report/scientificWorks/scientific-works-report.slices";
import {telemedicineReportReducer} from "./report/telemedicine/telemedicine.slices";
import {trainingReportReducer} from "./report/training/training-report.slices";
import {visitForeignSpecialistsReportReducer} from "./report/visitForeignSpecialists/visitForeignSpecialists.slices";
import {setOfReportsReducer} from "./setOfReports/setOfReports.slices";
import {userReducer} from "./user/user.slices";

const State = {
	file: fileReducer,
	user: userReducer,
	global: globalReducer,
	dailyReport: dailyReportReducer,
	appealsReport: appealsReportReducer,
	scienceReport: scienceReportReducer,
	trainingReport: trainingReportReducer,
	departureReport: departureReportReducer,
	insuranceReport: insuranceReportReducer,
	mediaPlaceReport: mediaPlaceReportReducer,
	telemedicineReport: telemedicineReportReducer,
	implementationReport: implementationReportReducer,
	scientificWorksReport: scientificWorksReportReducer,
	scientificEventsReport: scientificEventsReportReducer,
	financialExpensesReport: financialExpensesReportReducer,
	visitForeignSpecialistsReport: visitForeignSpecialistsReportReducer,
	setOfReports: setOfReportsReducer,
};

export const appReducer = combineReducers(State);

export const rootReducer: Reducer<
	CombinedState<StateFromReducersMapObject<typeof State>>,
	ActionFromReducersMapObject<typeof State>
> = (state, action) => {
	// if (action.type === 'global/logOut') {
	//     state = undefined;
	// }

	return appReducer(state, action);
};
