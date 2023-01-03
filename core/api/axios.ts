import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

import {Toast} from "../utils";

class Api {
	private readonly instance: AxiosInstance;

	constructor(_instance: AxiosInstance) {
		this.instance = _instance;
	}

	get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
		return this.instance.get(url, config);
	}

	post<T = any, R = AxiosResponse<T>, D = any>(
		url: string,
		data?: D,
		config?: AxiosRequestConfig<D>,
		message?: {pending: string | false; success: string | false},
	): Promise<R> {
		return Toast.promise(this.instance.post(url, data, config), {
			pending: message?.pending ?? "Подождите...",
			success: message?.success ?? "Готово.",
		});
	}

	patch<T = any, R = AxiosResponse<T>, D = any>(
		url: string,
		data?: D,
		config?: AxiosRequestConfig<D>,
		message?: {pending: string; success: string},
	): Promise<R> {
		return Toast.promise(this.instance.patch(url, data, config), {
			pending: message?.pending ?? "Подождите...",
			success: message?.success ?? "Готово.",
		});
	}

	delete<T = any, R = AxiosResponse<T>, D = any>(
		url: string,
		config?: AxiosRequestConfig<D>,
		message?: {pending: string | false; success: string | false},
	): Promise<R> {
		return Toast.promise(this.instance.delete(url, config), {
			pending: message?.pending ?? "Start deleting ...",
			success: message?.success ?? "Deleted",
		});
	}
}

export const instance = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
});

instance.interceptors.request.use(function (config: AxiosRequestConfig) {
	const token = localStorage.getItem("jwt") || localStorage.getItem("guestJwt");

	if (token) {
		if (config.headers) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			config.headers.Authorization = token ? `Bearer ${token}` : "";
		}
	}

	return config;
});

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		Toast.error(error);
		if (error.response?.status === 401) {
			localStorage.removeItem("jwt");
		}

		return Promise.reject(error);
	},
);

export const api = Object.freeze(new Api(instance));
