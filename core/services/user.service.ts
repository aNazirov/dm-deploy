import {api, APIAuthUrl, APIUserUrl} from "../api";
import {ILogin, UserModel} from "../models";
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
};
