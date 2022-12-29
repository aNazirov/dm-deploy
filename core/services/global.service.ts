import {api, APIGlobalUrl} from "../api";
import {GlobalListItemModel} from "../models";

export const GlobalService = {
	getCountries: () => {
		return api
			.get<GlobalListItemModel[]>(APIGlobalUrl.countries)
			.then((res) => res.data.map((d) => new GlobalListItemModel(d)));
	},
	getSpecialities: () => {
		return api
			.get<GlobalListItemModel[]>(APIGlobalUrl.specialities)
			.then((res) => res.data.map((d) => new GlobalListItemModel(d)));
	},
	positions: () => {
		return api
			.get<GlobalListItemModel[]>(APIGlobalUrl.positions)
			.then((res) => res.data.map((d) => new GlobalListItemModel(d)));
	},
};
