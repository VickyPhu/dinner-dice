"use client";

import { Button, ButtonProps } from "@mui/material";

export default function SecondaryButton(props: ButtonProps) {
	return (
		<Button
			{...props}
			variant="outlined"
			sx={{
				boxShadow: "1px 1px 2px var(--button2-shadow)",
				color: "var(--text)",
				borderRadius: "var(--card-radius)",
				border: "1.5px solid var(--text)",

				"&:hover": {
					backgroundColor: "var(--button2-hover)",
					boxShadow: "1px 1px 4px var(--button2-shadow)",
				},

				...props.sx,
			}}
		/>
	);
}
