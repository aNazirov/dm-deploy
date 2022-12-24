import {
	ActionFromReducersMapObject,
	CombinedState,
	combineReducers,
	Reducer,
	StateFromReducersMapObject,
} from "@reduxjs/toolkit";

import {dailyReportReducer} from "./report/daily/daily-report.slices";
import {financialExpensesReportReducer} from "./report/financialExpenses/financial-expenses-report.slices";
import {TelemedicineReportReducer} from "./report/telemedicine/telemedicine.slices";
import {trainingReportReducer} from "./report/training/training-report.slices";
import {themeReducer} from "./theme/theme.slices";
import {userReducer} from "./user/user.slices";

const State = {
	user: userReducer,
	theme: themeReducer,
	dailyReport: dailyReportReducer,
	trainingReport: trainingReportReducer,
	financialExpensesReport: financialExpensesReportReducer,
	telemedicineReport: TelemedicineReportReducer,
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
