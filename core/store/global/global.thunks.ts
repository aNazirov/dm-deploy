import {createAsyncThunk} from "@reduxjs/toolkit";

import {IAutoCompleteParams} from "../../models";
import {GlobalService} from "../../services";

export const globalAutocompleteThunk = createAsyncThunk(
	"global/getGlobalListThunk",
	async (payload: IAutoCompleteParams, thunkAPI) => {
		const result = await GlobalService.autoComplete(payload, thunkAPI.signal);

		if (result) {
			return result.hits;
		}
	},
	{dispatchConditionRejection: true},
);
