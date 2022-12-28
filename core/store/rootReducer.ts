import {
	ActionFromReducersMapObject,
	CombinedState,
	combineReducers,
	Reducer,
	StateFromReducersMapObject,
} from "@reduxjs/toolkit";

import {globalReducer} from "./global/global.slices";
import {dailyReportReducer} from "./report/daily/daily-report.slices";
import {financialExpensesReportReducer} from "./report/financialExpenses/financial-expenses-report.slices";
import {mediaPlaceReportReducer} from "./report/mediaPlace/mediaPlace.slices";
import {scienceReportReducer} from "./report/science/science.slices";
import {telemedicineReportReducer} from "./report/telemedicine/telemedicine.slices";
import {trainingReportReducer} from "./report/training/training-report.slices";
import {visitForeignSpecialistsReportReducer} from "./report/visitForeignSpecialists/visitForeignSpecialists.slices";
import {userReducer} from "./user/user.slices";

const State = {
	user: userReducer,
	global: globalReducer,
	dailyReport: dailyReportReducer,
	scienceReport: scienceReportReducer,
	trainingReport: trainingReportReducer,
	mediaPlaceReport: mediaPlaceReportReducer,
	telemedicineReport: telemedicineReportReducer,
	financialExpensesReport: financialExpensesReportReducer,
	visitForeignSpecialistsReport: visitForeignSpecialistsReportReducer,
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
