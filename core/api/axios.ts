import axios, { AxiosRequestConfig } from "axios";

import { Toast } from "../utils";

const localApi = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
});

api.interceptors.request.use(function (config: AxiosRequestConfig) {
	const token = localStorage.getItem("jwt") || localStorage.getItem("guestJwt");

	if (token) {
		if (config.headers) {
			config.headers.Authorization = token ? `Bearer ${token}` : "";
		}
	}

	return config;
});

api.interceptors.response.use(
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

export const api = localApi;