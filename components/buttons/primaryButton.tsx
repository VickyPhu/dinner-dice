"use client";

import { Button, ButtonProps } from "@mui/material";

export default function PrimaryButton(props: ButtonProps) {
	return (
		<Button
			{...props}
			variant="contained"
			sx={{
				boxShadow: "1px 1px 1px var(--button-shadow)",
				backgroundColor: "var(--button)",
				color: "var(--text)",
				borderRadius: "var(--card-radius)",
				border: "1px solid var(--button-border)",

				"&:hover": {
					backgroundColor: "var(--button-hover)",
					color: "var(--white)",
					boxShadow: "1px 1px 2px var(--button-hover-shadow)",
					border: "1px solid var(--button-border)",
				},

				...props.sx,
			}}
		/>
	);
}
