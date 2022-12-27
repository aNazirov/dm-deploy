import api from "../api";
import {GlobalListItemModel} from "../models";

export const GlobalService = {
	getCountries: () => {
		return api
			.get<GlobalListItemModel[]>("global/countries")
			.then((res) => res.data.map((d) => new GlobalListItemModel(d)));
	},
	getSpecialities: () => {
		return api
			.get<GlobalListItemModel[]>("global/specialities")
			.then((res) => res.data.map((d) => new GlobalListItemModel(d)));
	},
	positions: () => {
		return api
			.get<GlobalListItemModel[]>("global/positions")
			.then((res) => res.data.map((d) => new GlobalListItemModel(d)));
	},
};
