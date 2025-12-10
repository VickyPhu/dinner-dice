"use client";

import {
	Box,
	Button,
	List,
	ListItem,
	ListItemText,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";

export default function StepsInput({
	value,
	onChange,
}: {
	value: string[];
	onChange: (steps: string[]) => void;
}) {
	const [input, setInput] = useState("");

	function addStep() {
		if (!input.trim()) return;
		onChange([...value, input.trim()]);
		setInput("");
	}

	return (
		<Box>
			<Typography variant="h6">Steps</Typography>
			<Stack direction="row">
				<TextField
					fullWidth
					label="e.g Cut the onion in cubes"
					value={input}
					onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							addStep();
						}
					}}
				/>
				<Button variant="contained" onClick={addStep}>
					Add
				</Button>
			</Stack>
			<List>
				{value.map((step, index) => (
					<ListItem key={index}>
						<ListItemText primary={`${index + 1}. ${step}`} />
					</ListItem>
				))}
			</List>
		</Box>
	);
}
