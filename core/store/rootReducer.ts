import {
	ActionFromReducersMapObject,
	CombinedState,
	combineReducers,
	Reducer,
	StateFromReducersMapObject,
} from "@reduxjs/toolkit";

import {dailyReport} from "./report/daily/daily-report.slices";
import {themeReducer} from "./theme/theme.slices";
import {userReducer} from "./user/user.slices";

const State = {
	theme: themeReducer,
	user: userReducer,
	dailyReport: dailyReport,
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
