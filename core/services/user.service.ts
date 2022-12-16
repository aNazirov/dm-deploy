import api from "../api";
import {ILogin, UserModel} from "../models";
import {store} from "../store";
import {userLogoutThunk} from "../store/user/user.thunks";
import {Toast} from "../utils";

export const UserService = {
	login(params: ILogin, signal?: AbortSignal) {
		return api.post("auth/login", params, {signal}).then((res) => {
			Toast.success("Вы успешно вошли в свой аккаунт");
			localStorage.setItem("jwt", res.data.jwt || "");
			return res.data;
		});
	},

	getByToken(signal?: AbortSignal) {
		return api
			.get<UserModel>("user/token", {signal})
			.then((res) => {
				return {user: new UserModel(res.data)};
			})
			.catch((e) => {
				if (e.response?.status === 404) {
					store.dispatch(userLogoutThunk());
				}
				Toast.error(e);
			});
	},
};
