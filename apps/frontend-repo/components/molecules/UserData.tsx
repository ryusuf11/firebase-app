"use client";
import { useState } from "react";
import {
	TextField,
	Button,
	Card,
	CardContent,
	Typography,
	CircularProgress,
	Backdrop,
} from "@mui/material";
import LogoutButton from "../atoms/LogoutButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUserData, updateUserData } from "@/store/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
	name: Yup.string().required("Name is required"),
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
});

const UserDataForm = () => {
	const dispatch = useAppDispatch();
	const {
		data: formData,
		loading,
		error,
	} = useAppSelector((state) => state.user);

	const formik = useFormik({
		initialValues: {
			name: formData?.name || "",
			email: formData?.email || "",
		},
		enableReinitialize: true,
		validationSchema,
		onSubmit: async (values) => {
			if (!formData) return;
			try {
				await dispatch(
					updateUserData({ uid: formData.uid || "", ...values }),
				).unwrap();
				alert("Profile updated successfully!");
			} catch {
				alert("Error updating profile. Please try again.");
			}
		},
	});

	return (
		<>
			<Backdrop
				sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 4 })}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Card
				sx={{ maxWidth: 400, margin: "auto", mt: 5, p: 2, textAlign: "center" }}
			>
				<CardContent>
					<Typography variant="h5" gutterBottom>
						User Profile
					</Typography>
					{error && (
						<Typography color="error" sx={{ mb: 2 }}>
							{error}
						</Typography>
					)}
					<form onSubmit={formik.handleSubmit}>
						<TextField
							fullWidth
							margin="normal"
							label="Name"
							name="name"
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.name && Boolean(formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
						/>
						<TextField
							fullWidth
							margin="normal"
							label="Email"
							name="email"
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.email && Boolean(formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
						/>
						{!formData ? (
							<Button
								variant="contained"
								color="primary"
								fullWidth
								sx={{ mt: 2 }}
								onClick={() => dispatch(fetchUserData())}
							>
								Get User Profile
							</Button>
						) : (
							<Button
								type="submit"
								variant="contained"
								color="primary"
								fullWidth
								disabled={formik.isSubmitting || !formik.isValid || !formData}
								sx={{ mt: 2 }}
							>
								{formik.isSubmitting ? (
									<CircularProgress size={24} />
								) : (
									"Save Changes"
								)}
							</Button>
						)}
						<LogoutButton />
					</form>
				</CardContent>
			</Card>
		</>
	);
};

export default UserDataForm;
