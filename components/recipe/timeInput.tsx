"use client";

import { timeOptions } from "@/constants/timeoptions";
import { Box, MenuItem, Typography } from "@mui/material";
import TextInput from "../textInput";

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
		<Box>
			<Typography variant="body1">Prep- and cooking time</Typography>
			<TextInput
				select
				fullWidth
				value={value}
				onChange={(e) => onChange(e.target.value)}
				error={error}
				helperText={helperText}
			>
				{timeOptions.map((t) => (
					<MenuItem key={t} value={t}>
						{t}
					</MenuItem>
				))}
			</TextInput>
		</Box>
	);
}
