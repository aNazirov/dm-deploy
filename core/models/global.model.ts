import {ITranslate} from "./user.model";

export interface IAutoCompleteParams {
	index?: "specialities" | "positions" | "countries";
	search?: string;
	// filter: ["specialities=1,2,3", "positions=1,2,3", "countries=2,3,5"]
	filter?: string[];
	limit?: number;
	offset?: number;
}

export interface IAutoCompleteResult {
	hits: {
		id: number;
		title?: ITranslate;
	}[];
	count: number;
	query: string;
}
