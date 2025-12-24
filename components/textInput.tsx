"use client";

import { TextField, TextFieldProps } from "@mui/material";

export default function TextInput(props: TextFieldProps) {
	return (
		<TextField
			{...props}
			variant="outlined"
			sx={{
				background: "var(--white)",
				borderRadius: "var(--card-radius)",

				"& .MuiInputBase-input": {
					color: "var(--text)",
				},

				"& .MuiInputLabel-root": {
					color: "var(--button2-shadow)",
				},

				"& .MuiInputLabel-root.Mui-focused": {
					color: "var(--button2-shadow)",
				},

				"& .MuiOutlinedInput-notchedOutline": {
					borderColor: "var(--button-hover)",
				},

				"&:hover .MuiOutlinedInput-notchedOutline": {
					borderColor: "var(--text)",
				},

				"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
					{
						borderColor: "var(--button-hover)",
					},

				"& .MuiInputLabel-root.Mui-error": {
					color: "error",
				},

				"& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
					borderColor: "error",
				},

				...props.sx,
			}}
		/>
	);
}
