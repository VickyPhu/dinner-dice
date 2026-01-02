"use client";

import { timeOptions } from "@/constants/timeoptions";
import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";

interface Props {
	value: string;
	onChange: (value: string) => void;
	error?: boolean;
	helperText?: string;
}

export default function TimeInput({
	value,
	onChange,
	error,
	helperText,
}: Props) {
	return (
		<FormControl
			fullWidth
			margin="normal"
			variant="outlined"
			required
			error={error}
			sx={{
				background: "var(--white)",
				borderRadius: "var(--card-radius)",

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
				"& .Mui-focused .MuiOutlinedInput-notchedOutline": {
					borderColor: "var(--button-hover)",
				},
				"& .Mui-error .MuiOutlinedInput-notchedOutline": {
					borderColor: "error",
				},
				"& .MuiInputLabel-root.Mui-error": {
					color: "error",
				},
			}}
		>
			<InputLabel id="time-label" htmlFor="time-select">
				Prep- and cooking time
			</InputLabel>
			<Select
				labelId="time-label"
				label="Prep- and cooking time"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				inputProps={{
					id: "time-select",
				}}
				sx={{
					"& .MuiSelect-select": {
						color: "var(--text)",
					},
				}}
			>
				{timeOptions.map((t) => (
					<MenuItem key={t} value={t}>
						{t}
					</MenuItem>
				))}
			</Select>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
}
