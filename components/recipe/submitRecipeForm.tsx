"use client";

import { RecipeFormProp } from "@/app/groups/[groupId]/submit-recipe/actions";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import PrimaryButton from "../buttons/primaryButton";
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
		<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
			<Box>
				<Typography variant="body1">Recipe title</Typography>
				<TextInput
					fullWidth
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</Box>
			<TimeInput value={time} onChange={setTime} />
			<IngredientInput value={ingredients} onChange={setIngredients} />
			<StepsInput value={steps} onChange={setSteps} />
			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<PrimaryButton
					variant="contained"
					sx={{ mt: 2, maxWidth: "10rem" }}
					onClick={() => onSubmit({ title, time, ingredients, steps })}
				>
					{mode === "edit" ? "Save changes" : "Submit recipe"}
				</PrimaryButton>
			</Box>
		</Box>
	);
}
