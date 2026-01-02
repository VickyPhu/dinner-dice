"use client";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
	Box,
	FormHelperText,
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

interface Props {
	value: string[];
	onChange: (ingredients: string[]) => void;
	error?: boolean;
	helperText?: string;
}

export default function IngredientInput({
	value,
	onChange,
	error,
	helperText,
}: Props) {
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
					error={error}
				/>
				<PrimaryButton variant="contained" onClick={addIngredient}>
					Add
				</PrimaryButton>
			</Stack>
			{helperText && (
				<FormHelperText error sx={{ paddingLeft: 2, background:"white", borderRadius: 1,}}>
					{helperText}
				</FormHelperText>
			)}
			<List dense sx={{ mt: 2 }}>
				{value.map((ingredient, index) => (
					<ListItem
						key={index}
						secondaryAction={
							<IconButton
								aria-label="Remove ingredient"
								size="small"
								edge="end"
								onClick={() => removeIngredient(index)}
								sx={{
									transition: "transform 0.2s ease",
									"&:hover": {
										transform: "scale(1.05)",
									},
								}}
							>
								<DeleteOutlineIcon
									sx={{ fontSize: { xs: 30 }, color: "var(--text)" }}
								/>
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
