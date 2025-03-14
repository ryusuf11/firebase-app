"use client";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginStart, loginSuccess, loginFailure } from "../../store/authSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { updateUser } from "@/apis/userApi";

const LoginForm = () => {
	const dispatch = useAppDispatch();
	const { loading, error } = useAppSelector((state) => state.auth);
	const router = useRouter();

	const handleGoogleLogin = async () => {
		dispatch(loginStart());
		try {
			const result = await signInWithPopup(auth, googleProvider);
			const token = await result.user.getIdToken();

			Cookies.set("authToken", token, { expires: 1, path: "/" });

			await updateUser({
				uid: result.user.uid,
				name: result.user.displayName || "",
				email: result.user.email || "",
			});

			dispatch(loginSuccess({ uid: result.user.uid }));
			router.push("/");
		} catch {
			dispatch(loginFailure("Google login failed"));
		}
	};

	return (
		<Box
			sx={{
				maxWidth: 400,
				mx: "auto",
				mt: 8,
				p: 3,
				boxShadow: 3,
				borderRadius: 2,
			}}
		>
			<Typography variant="h5" gutterBottom>
				Login
			</Typography>
			{error && <Typography color="error">{error}</Typography>}
			<Button
				fullWidth
				variant="outlined"
				sx={{ mt: 2 }}
				onClick={handleGoogleLogin}
				disabled={loading}
			>
				{loading ? <CircularProgress size={24} /> : "Sign in with Google"}
			</Button>
		</Box>
	);
};

export default LoginForm;
