"use client";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

type Props = {
	children: React.ReactNode;
};

export default function ThemeProviders({ children }: Props) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
