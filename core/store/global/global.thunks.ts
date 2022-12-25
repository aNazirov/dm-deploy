import {createAsyncThunk} from "@reduxjs/toolkit";

import {GlobalListItemModel} from "../../models";
import {GlobalService} from "../../services";
import {setGlobalListAction} from "./global.slices";

export const getGlobalListThunk = createAsyncThunk(
	"global/getGlobalListThunk",
	async (listType: "countries" | "specialities", thunkAPI) => {
		const result: GlobalListItemModel[] = [];

		if (listType === "countries") {
			result.push(...(await GlobalService.getCountries()));
		} else if (listType === "specialities") {
			result.push(...(await GlobalService.getSpecialities()));
		}

		if (result.length) {
			thunkAPI.dispatch(setGlobalListAction({data: result, listType}));
		}
	},
);
