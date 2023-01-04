import {createAsyncThunk} from "@reduxjs/toolkit";

import {APISetOfReportsUrl} from "../../api";
import {ISetOfReportsParams} from "../../models";
import {setOfReportsService} from "../../services";

export const getSetOfReportsThunks = createAsyncThunk(
	"setOfReports/getThunk",
	async ({params, url}: {params: ISetOfReportsParams; url: keyof typeof APISetOfReportsUrl}) => {
		return await setOfReportsService.get({url, params});
	},
);
