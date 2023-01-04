import {api, APIAuthUrl, APIUserUrl} from "../api";
import {ILogin, IUserCreateParams, IUserFilterParams, UserModel} from "../models";
import {store} from "../store";
import {userLogoutThunk} from "../store/user/user.thunks";
import {Toast} from "../utils";

export const UserService = {
	login(params: ILogin, signal?: AbortSignal) {
		return api.post(APIAuthUrl.login, params, {signal}).then((res) => {
			localStorage.setItem("jwt", res.data.jwt || "");
			return res.data;
		});
	},

	getByToken(signal?: AbortSignal) {
		return api
			.get<UserModel>(APIUserUrl.token, {signal})
			.then((res) => {
				return {user: new UserModel(res.data)};
			})
			.catch((e) => {
				if (e.response?.status === 404 || e.response?.status === 403) {
					store.dispatch(userLogoutThunk());
				}
				Toast.error(e);
			});
	},

	getById(id: number, signal?: AbortSignal) {
		return api.get<UserModel>(`${APIUserUrl.user}/${id}`, {signal}).then((res) => new UserModel(res.data));
	},

	getAll(params: IUserFilterParams = {skip: 0, take: 20}, signal?: AbortSignal) {
		return api
			.get<{count: number; data: UserModel[]}>(APIUserUrl.user, {params: {params}, signal})
			.then((res) => ({count: res.data.count, data: res.data.data.map((u) => new UserModel(u))}));
	},

	create(params: IUserCreateParams, signal?: AbortSignal) {
		return api.post<UserModel>(APIUserUrl.user, params, {signal}).then((res) => new UserModel(res.data));
	},

	update(params: Partial<IUserCreateParams>, signal?: AbortSignal) {
		return api.patch<UserModel>(APIUserUrl.user, params, {signal}).then((res) => new UserModel(res.data));
	},

	delete(id: number, signal?: AbortSignal) {
		return api.delete(`${APIUserUrl.user}/${id}`, {signal}).then((res) => res.data);
	},
};
