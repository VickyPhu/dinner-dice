"use client";

import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function FrequencySelect() {
	const { control } = useFormContext();

	return (
		<FormControl
			fullWidth
			margin="normal"
			variant="outlined"
			required
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
			<InputLabel id="frequency-label">Sharing Frequency</InputLabel>
			<Controller
				name="sharing_frequency"
				control={control}
				render={({ field, fieldState }) => (
					<>
						<Select
							{...field}
							id="sharing-frequency"
							labelId="frequency-label"
							label="Sharing frequency"
							sx={{
								"& .MuiSelect-select": {
									color: "var(--text)",
								},
							}}
						>
							{[1, 2, 3, 4, 5, 6, 7].map((freq) => (
								<MenuItem role="option" key={freq} value={freq}>
									{freq} day{freq > 1 ? "s" : ""}
								</MenuItem>
							))}
						</Select>
						{fieldState.error && (
							<FormHelperText error>{fieldState.error.message}</FormHelperText>
						)}
					</>
				)}
			/>
		</FormControl>
	);
}
