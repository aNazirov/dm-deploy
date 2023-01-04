import {api, APIOrganizationUrl} from "../api";
import {IOrganizationCreateParams, IOrganizationGetParams, OrganizationModel} from "../models";

export const OrganizationService = {
	getById(id: number, signal?: AbortSignal) {
		return api
			.get<OrganizationModel>(`${APIOrganizationUrl.organization}/${id}`, {signal})
			.then((res) => new OrganizationModel(res.data));
	},

	getAll(params: IOrganizationGetParams = {skip: 0, take: 20}, signal?: AbortSignal) {
		return api
			.get<{count: number; data: OrganizationModel[]}>(APIOrganizationUrl.organization, {params: {params}, signal})
			.then((res) => ({count: res.data.count, data: res.data.data.map((u) => new OrganizationModel(u))}));
	},

	create(params: IOrganizationCreateParams, signal?: AbortSignal) {
		return api
			.post<OrganizationModel>(APIOrganizationUrl.organization, params, {signal})
			.then((res) => new OrganizationModel(res.data));
	},

	update({id, body}: {id: number; body: Partial<IOrganizationCreateParams>}, signal?: AbortSignal) {
		return api
			.patch<OrganizationModel>(`${APIOrganizationUrl.organization}/${id}`, body, {signal})
			.then((res) => new OrganizationModel(res.data));
	},

	delete(id: number, signal?: AbortSignal) {
		return api.delete(`${APIOrganizationUrl.organization}/${id}`, {signal}).then((res) => res.data);
	},
};
