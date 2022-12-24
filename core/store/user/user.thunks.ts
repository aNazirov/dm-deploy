import {createAsyncThunk} from "@reduxjs/toolkit";

import {ILogin} from "../../models";
import {UserService} from "../../services";
import {setUserAction} from "./user.slices";

export const userLoginThunk = createAsyncThunk(
	"user/loginThunk",
	async (payload: ILogin, thunkAPI) => {
		const result = await UserService.login(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setUserAction(result));
			return result;
		}
	},
	{dispatchConditionRejection: true},
);

export const userLogoutThunk = createAsyncThunk("user/logout", () => {
	const token = localStorage.getItem("jwt");

	if (token) {
		localStorage.removeItem("jwt");
	}
	window.location.href = "/auth/login";
});

export const autoLoginThunk = createAsyncThunk(
	"user/autoLogin",
	async (_, thunkAPI) => {
		const token = localStorage.getItem("jwt");

		if (token) {
			const data = await UserService.getByToken(thunkAPI.signal);

			if (data) {
				thunkAPI.dispatch(setUserAction(data.user));
			}
		}
	},
	{
		dispatchConditionRejection: true,
	},
);
