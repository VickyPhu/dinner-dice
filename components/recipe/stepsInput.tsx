"use client";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import {
	Box,
	Button,
	IconButton,
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

	function removeStep(index: number) {
		onChange(value.filter((_, i) => i !== index));
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
					<ListItem
						key={index}
						secondaryAction={
							<IconButton onClick={() => removeStep(index)}>
								<DeleteOutlineIcon />
							</IconButton>
						}
					>
						<ListItemText primary={`${index + 1}. ${step}`} />
					</ListItem>
				))}
			</List>
		</Box>
	);
}
