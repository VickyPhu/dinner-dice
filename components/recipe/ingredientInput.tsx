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

export default function IngredientInput({
	value,
	onChange,
}: {
	value: string[];
	onChange: (ingredients: string[]) => void;
}) {
	const [input, setInput] = useState("");

	function addIngredient() {
		if (!input.trim()) return;
		onChange([...value, input.trim()]);
		setInput("");
	}

	return (
		<Box>
			<Typography variant="h6">Ingredients</Typography>
			<Stack direction="row">
				<TextField
					fullWidth
					label="e.g 1 onion"
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<Button variant="contained" onClick={addIngredient}>
					Add
				</Button>
			</Stack>
			<List dense>
				{value.map((ingredient, index) => (
					<ListItem key={index}>
						<ListItemText primary={ingredient} />
					</ListItem>
				))}
			</List>
		</Box>
	);
}
