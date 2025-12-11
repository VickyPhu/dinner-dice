"use client";

import { RecipeFormProp } from "@/app/groups/[groupId]/submit-recipe/actions";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import IngredientInput from "./ingredientInput";
import StepsInput from "./stepsInput";
import TimeInput from "./timeInput";

export default function SubmitRecipeForm({
	onSubmit,
}: {
	onSubmit: (values: RecipeFormProp) => void;
}) {
	const [title, setTitle] = useState("");
	const [time, setTime] = useState("");
	const [ingredients, setIngredients] = useState<string[]>([]);
	const [steps, setSteps] = useState<string[]>([]);

	return (
		<Box>
			<Typography variant="h6">Recipe title</Typography>
			<TextField
				fullWidth
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<TimeInput value={time} onChange={setTime} />
			<IngredientInput value={ingredients} onChange={setIngredients} />
			<StepsInput value={steps} onChange={setSteps} />
			<Button
				variant="contained"
				sx={{ mt: 2 }}
				onClick={() => onSubmit({ title, time, ingredients, steps })}
			>
				Submit recipe
			</Button>
		</Box>
	);
}
