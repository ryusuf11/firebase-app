import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	user: { uid: string } | null;
	loading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	user: null,
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		loginSuccess: (state, action: PayloadAction<{ uid: string }>) => {
			state.user = action.payload;
			state.loading = false;
		},
		loginFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		logout: (state) => {
			state.user = null;
		},
	},
});

export const { loginStart, loginSuccess, loginFailure, logout } =
	authSlice.actions;
export default authSlice.reducer;
