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
		<FormControl fullWidth margin="normal">
			<InputLabel id="frequency-label">Sharing Frequency</InputLabel>
			<Controller
				name="sharing_frequency"
				control={control}
				render={({ field, fieldState }) => (
					<>
						<Select
							{...field}
							labelId="frequency-label"
							label="Sharing Frequency"
						>
							{[1, 2, 3, 4, 5, 6, 7].map((freq) => (
								<MenuItem key={freq} value={freq}>
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
