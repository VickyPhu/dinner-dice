"use client";

import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	Typography,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function WeekdayPicker() {
	const { watch, setValue, formState } = useFormContext();

	const frequency = watch("sharing_frequency");
	const selectedDays: string[] = watch("weekdays") || [];
	const error = formState.errors.weekdays?.message as string | undefined;

	const maxReached = selectedDays.length >= frequency;

	const toggleDay = (day: string) => {
		let updatedDays = [...selectedDays];

		if (updatedDays.includes(day)) {
			// Deselect the day
			updatedDays = updatedDays.filter((d) => d !== day);
		} else {
			// Add day only if max not reached (this should not be allowed in the UI)
			if (!maxReached) updatedDays.push(day);
		}
		setValue("weekdays", updatedDays, { shouldValidate: true });
	};

	return (
		<>
			<Typography variant="body1" color={"var(--text)"} mt={1}>
				On which day/s? *
			</Typography>
			<FormGroup row>
				{weekdays.map((day) => {
					const isChecked = selectedDays.includes(day);
					const disabledCheckbox = !isChecked && maxReached;
					return (
						<FormControlLabel
							key={day}
							label={day}
							sx={{
								"& .MuiFormControlLabel-label": {
									color: "var(--text)",
								},
							}}
							control={
								<Checkbox
									checked={isChecked}
									onChange={() => toggleDay(day)}
									disabled={disabledCheckbox}
									sx={{
										color: "var(--text)",

										"&.Mui-checked": {
											color: "var(--text)",
										},
									}}
								/>
							}
						/>
					);
				})}
			</FormGroup>
			{error && (
				<FormHelperText
					error
					sx={{
						background: "var(--white)",
						padding: "0.25rem 0.5rem",
						borderRadius: "0.25rem",
					}}
				>
					{error}
				</FormHelperText>
			)}
		</>
	);
}
