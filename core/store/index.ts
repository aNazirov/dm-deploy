import {createWrapper} from "next-redux-wrapper";
import {configureStore} from "@reduxjs/toolkit";

import {rootReducer} from "./rootReducer";

export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(() => store);
