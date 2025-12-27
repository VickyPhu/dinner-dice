"use client";

import { RecipeFormProp } from "@/app/groups/[groupId]/submit-recipe/actions";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import TextInput from "../textInput";
import IngredientInput from "./ingredientInput";
import StepsInput from "./stepsInput";
import TimeInput from "./timeInput";

type SubmitRecipeFormProps = {
	onSubmit: (values: RecipeFormProp) => void;
	defaultValues?: RecipeFormProp;
	mode: "create" | "edit";
};

export default function SubmitRecipeForm({
	onSubmit,
	defaultValues,
	mode,
}: SubmitRecipeFormProps) {
	const [title, setTitle] = useState(defaultValues?.title ?? "");
	const [time, setTime] = useState(defaultValues?.time ?? "");
	const [ingredients, setIngredients] = useState<string[]>(
		defaultValues?.ingredients ?? []
	);
	const [steps, setSteps] = useState<string[]>(defaultValues?.steps ?? []);

	return (
		<Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
			<Typography variant="body1">Recipe title</Typography>
			<TextInput
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
				{mode === "edit" ? "Save changes" : "Submit recipe"}
			</Button>
		</Box>
	);
}
