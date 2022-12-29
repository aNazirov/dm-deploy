import {api, APIGlobalUrl} from "../api";
import {IAutoCompleteParams, IAutoCompleteResult} from "../models";

export const GlobalService = {
	autoComplete(params?: IAutoCompleteParams, signal?: AbortSignal) {
		return api.get<IAutoCompleteResult>(APIGlobalUrl.autoComplete, {params, signal}).then((res) => res.data);
	},
};
