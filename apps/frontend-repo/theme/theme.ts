import { createTheme, type ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
	palette: {
		mode: "light",
		primary: {
			main: "#1976d2", // Blue
			contrastText: "#ffffff",
		},
		secondary: {
			main: "#ff4081", // Pink
			contrastText: "#ffffff",
		},
		background: {
			default: "#f5f5f5",
			paper: "#ffffff",
		},
	},
	typography: {
		fontFamily: `"Inter", "Arial", sans-serif`,
		h1: { fontSize: "2.5rem", fontWeight: 700 },
		h2: { fontSize: "2rem", fontWeight: 600 },
		body1: { fontSize: "1rem" },
	},
	shape: {
		borderRadius: 8,
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					borderRadius: "8px",
				},
			},
		},
	},
};

const theme = createTheme(themeOptions);

export default theme;
