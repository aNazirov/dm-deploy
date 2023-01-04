import {createAsyncThunk} from "@reduxjs/toolkit";

import {IOrganizationCreateParams, IOrganizationGetParams} from "../../models";
import {OrganizationService} from "../../services";
import {deleteOrganizationAction, setAllOrganizationsAction, setOrganizationToListAction} from "./organization.slices";

export const createOrganizationThunk = createAsyncThunk(
	"organization/createThunk",
	async (payload: IOrganizationCreateParams, thunkAPI) => {
		const result = await OrganizationService.create(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setOrganizationToListAction(result));
			return result.id;
		}
	},
	{
		dispatchConditionRejection: true,
	},
);

export const updateOrganizationThunk = createAsyncThunk(
	"organization/updateThunk",
	async (payload: {id: number; body: Partial<IOrganizationCreateParams>}, thunkAPI) => {
		const result = await OrganizationService.update(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setOrganizationToListAction(result));
			return result.id;
		}
	},
	{
		dispatchConditionRejection: true,
	},
);

export const deleteOrganizationThunk = createAsyncThunk(
	"organization/deleteThunk",
	async (payload: number, thunkAPI) => {
		const result = await OrganizationService.delete(payload, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(deleteOrganizationAction(payload));
			return result;
		}
	},
	{
		dispatchConditionRejection: true,
	},
);

export const getAllOrganizationsThunk = createAsyncThunk(
	"organization/getOrganizationsThunk",
	async (params: IOrganizationGetParams | undefined, thunkAPI) => {
		const result = await OrganizationService.getAll(params, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setAllOrganizationsAction({list: result.data, count: result.count}));
		}
	},
	{dispatchConditionRejection: true},
);

export const getOrganizationsByIdThunk = createAsyncThunk(
	"organization/getOrganizationByIdThunk",
	async (payload: number, thunkAPI) => {
		const result = await OrganizationService.getById(payload, thunkAPI.signal);

		if (result) {
			// thunkAPI.dispatch(setOrganizationToListAction(result));
			return result;
		}
	},
	{dispatchConditionRejection: true},
);
