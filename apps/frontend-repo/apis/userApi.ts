import type { User } from "@repo/shared";
import { Get, Put } from "../shared/fetcher";

export const fetchUser = async () =>
	Get({
		url: "/api/fetch-user-data",
	});

export const updateUser = async (payload: Partial<User>) =>
	await Put({
		url: "/api/update-user-data",
		data: payload,
	});
