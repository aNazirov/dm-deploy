import {createAsyncThunk} from "@reduxjs/toolkit";

import {ILogin, IUserCreateParams, IUserFilterParams} from "../../models";
import {UserService} from "../../services";
import {deleteOrganizationAction} from "../organization/organization.slices";
import {setAllUsersAction, setCurrentUserAction, setUserToListAction} from "./user.slices";

export const userLoginThunk = createAsyncThunk(
	"user/loginThunk",
	async (payload: ILogin, thunkAPI) => {
		const result = await UserService.login(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setCurrentUserAction(result));
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
	window.location.href = "/auth";
});

export const autoLoginThunk = createAsyncThunk(
	"user/autoLogin",
	async (_, thunkAPI) => {
		const token = localStorage.getItem("jwt");

		if (token) {
			const result = await UserService.getByToken(thunkAPI.signal);

			if (result) {
				thunkAPI.dispatch(setCurrentUserAction(result.user));
			}
		}
	},
	{
		dispatchConditionRejection: true,
	},
);

export const createUserThunk = createAsyncThunk(
	"user/createThunk",
	async (payload: IUserCreateParams, thunkAPI) => {
		const result = await UserService.create(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setUserToListAction(result));
			return result.id;
		}
	},
	{
		dispatchConditionRejection: true,
	},
);

export const updateUserThunk = createAsyncThunk(
	"user/updateThunk",
	async (
		{
			deletingPermissionsIds,
			...payload
		}: {id: number; body: Partial<IUserCreateParams>; deletingPermissionsIds?: number[]},
		thunkAPI,
	) => {
		deletingPermissionsIds?.forEach((id) => UserService.deletePermission(id, thunkAPI.signal));

		const result = await UserService.update(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setUserToListAction(result));
			return result.id;
		}
	},
	{
		dispatchConditionRejection: true,
	},
);

export const deleteUserThunk = createAsyncThunk(
	"user/deleteThunk",
	async (payload: number, thunkAPI) => {
		const result = await UserService.delete(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(deleteOrganizationAction(payload));
			return result;
		}
	},
	{
		dispatchConditionRejection: true,
	},
);

export const getAllUsersThunk = createAsyncThunk(
	"user/getUsersThunk",
	async (params: IUserFilterParams | undefined, thunkAPI) => {
		const result = await UserService.getAll(params, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setAllUsersAction({list: result.data, count: result.count}));
		}
	},
	{dispatchConditionRejection: true},
);

export const getUsersByIdThunk = createAsyncThunk(
	"user/getUserByIdThunk",
	async (payload: number, thunkAPI) => {
		const result = await UserService.getById(payload, thunkAPI.signal);

		if (result) {
			// thunkAPI.dispatch(setUserToListAction(result));
			return result;
		}
	},
	{dispatchConditionRejection: true},
);
