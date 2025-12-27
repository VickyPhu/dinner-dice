"use client";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import {
	Box,
	Button,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Stack,
	Typography,
} from "@mui/material";
import { useState } from "react";
import TextInput from "../textInput";

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

	function moveStepUp(index: number) {
		if (index === 0) return;
		const move = [...value];
		[move[index - 1], move[index]] = [move[index], move[index - 1]];
		onChange(move);
	}

	function moveStepDown(index: number) {
		if (index === value.length - 1) return;
		const move = [...value];
		[move[index + 1], move[index]] = [move[index], move[index + 1]];
		onChange(move);
	}

	return (
		<Box>
			<Typography variant="body1">Steps</Typography>
			<Stack direction="row">
				<TextInput
					multiline
					minRows={1}
					maxRows={6}
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
							<Stack direction="row">
								<IconButton
									onClick={() => moveStepUp(index)}
									disabled={index === 0}
								>
									<ArrowUpwardOutlinedIcon />
								</IconButton>
								<IconButton
									onClick={() => moveStepDown(index)}
									disabled={index === value.length - 1}
								>
									<ArrowDownwardOutlinedIcon />
								</IconButton>
								<IconButton onClick={() => removeStep(index)}>
									<DeleteOutlineIcon />
								</IconButton>
							</Stack>
						}
					>
						<ListItemText primary={`${index + 1}. ${step}`} />
					</ListItem>
				))}
			</List>
		</Box>
	);
}
