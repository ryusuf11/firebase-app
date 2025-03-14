import { API_BASE_URL } from "@/config/api";
import axios, { type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
});

export const injectTokenOnRequest = (config: InternalAxiosRequestConfig) => {
	const token = Cookies.get("authToken");

	if (token) {
		(
			config.headers as Exclude<typeof config.headers, undefined>
		).Authorization = `Bearer ${token}`;
	}

	return config;
};

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) =>
	injectTokenOnRequest(config),
);

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error?.response?.status === 401 || error?.code === "ERR_NETWORK") {
			Cookies.remove("authToken");
			window.location.href = "/login";
		}

		return Promise.reject(error);
	},
);
