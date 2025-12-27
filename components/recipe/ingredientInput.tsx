"use client";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
	Box,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Stack,
	Typography,
} from "@mui/material";
import { useState } from "react";
import PrimaryButton from "../buttons/primaryButton";
import TextInput from "../textInput";

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

	function removeIngredient(index: number) {
		const remove = value.filter((_, i) => i !== index);
		onChange(remove);
	}

	return (
		<Box>
			<Typography variant="body1">Ingredients</Typography>
			<Stack direction="row" gap={1}>
				<TextInput
					fullWidth
					label="e.g 1 onion"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							addIngredient();
						}
					}}
				/>
				<PrimaryButton variant="contained" onClick={addIngredient}>
					Add
				</PrimaryButton>
			</Stack>
			<List dense>
				{value.map((ingredient, index) => (
					<ListItem
						key={index}
						secondaryAction={
							<IconButton edge="end" onClick={() => removeIngredient(index)}>
								<DeleteOutlineIcon />
							</IconButton>
						}
					>
						<ListItemText primary={ingredient} />
					</ListItem>
				))}
			</List>
		</Box>
	);
}
