"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LogoutButton = () => {
	const router = useRouter();

	const handleLogout = () => {
		Cookies.remove("authToken");
		router.push("/login");
	};

	return (
		<Button
			variant="contained"
			color="secondary"
			onClick={handleLogout}
			fullWidth
			sx={{ marginTop: 2 }}
		>
			Logout
		</Button>
	);
};

export default LogoutButton;
