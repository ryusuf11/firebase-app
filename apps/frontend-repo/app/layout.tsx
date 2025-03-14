"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import theme from "../theme/theme";
import { store } from "../store/store";
import { Provider } from "react-redux";

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={theme}>
						<Provider store={store}>
							<CssBaseline />
							{children}
						</Provider>
					</ThemeProvider>
				</StyledEngineProvider>
			</body>
		</html>
	);
}
