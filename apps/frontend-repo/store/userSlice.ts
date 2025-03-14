import {
	createSlice,
	createAsyncThunk,
	type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchUser, updateUser } from "@/apis/userApi";
import type { User } from "@repo/shared";

interface UserState {
	data: Partial<User> | null;
	loading: boolean;
	error: string | null;
}

const initialState: UserState = {
	data: null,
	loading: false,
	error: null,
};

export const fetchUserData = createAsyncThunk(
	"user/fetchUserData",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetchUser();
			return response.data as User;
		} catch (error) {
			return rejectWithValue(
				error instanceof Error ? error.message : "Failed to fetch user data",
			);
		}
	},
);

export const updateUserData = createAsyncThunk(
	"user/updateUserData",
	async (
		userData: { uid: string; name: string; email: string },
		{ rejectWithValue },
	) => {
		try {
			await updateUser(userData);
			return userData;
		} catch (error) {
			return rejectWithValue(
				error instanceof Error ? error.message : "Failed to update user data",
			);
		}
	},
);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateField: (
			state,
			action: PayloadAction<{ key: string; value: string }>,
		) => {
			if (state.data) {
				state.data[action.payload.key as keyof typeof state.data] =
					action.payload.value;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserData.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUserData.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(fetchUserData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(updateUserData.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateUserData.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(updateUserData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { updateField } = userSlice.actions;
export default userSlice.reducer;
