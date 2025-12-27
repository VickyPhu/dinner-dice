"use client";

import { Box, MenuItem, Typography } from "@mui/material";
import TextInput from "../textInput";

const timeOptions = [
	"0-10 min",
	"10-20 min",
	"20-30 min",
	"30-40 min",
	"40-50 min",
	"50-60 min",
	"60-75 min",
	"75-90 min",
	"90+ min",
];

interface Props {
	value: string;
	onChange: (value: string) => void;
}

export default function TimeInput({ value, onChange }: Props) {
	return (
		<Box>
			<Typography variant="body1">Prep- and cooking time</Typography>
			<TextInput
				select
				fullWidth
				value={value}
				onChange={(e) => onChange(e.target.value)}
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
