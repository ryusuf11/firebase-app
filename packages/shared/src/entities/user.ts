export interface User {
	uid: string;
	name: string;
	email: string;
	createdAt?: string;
}

export type BasicUser = Omit<User, "uid" | "createdAt">;
