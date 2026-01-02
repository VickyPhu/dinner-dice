"use client";

import { RecipeFormData, recipeSchema } from "@/schemas/recipeSchema";
import { Box } from "@mui/material";
import { useState } from "react";
import PrimaryButton from "../buttons/primaryButton";
import TextInput from "../textInput";
import IngredientInput from "./ingredientInput";
import StepsInput from "./stepsInput";
import TimeInput from "./timeInput";

type SubmitRecipeFormProps = {
	onSubmit: (values: RecipeFormData) => void;
	defaultValues?: RecipeFormData;
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
	const [errors, setErrors] = useState<
		Partial<Record<keyof RecipeFormData, string>>
	>({});

	const handleSubmit = () => {
		const result = recipeSchema.safeParse({ title, time, ingredients, steps });
		if (!result.success) {
			const fieldErrors: Partial<Record<keyof RecipeFormData, string>> = {};
			result.error.issues.forEach((issue) => {
				const path = issue.path[0] as keyof RecipeFormData;
				fieldErrors[path] = issue.message;
			});
			setErrors(fieldErrors);
			return;
		}
		setErrors({});
		onSubmit(result.data);
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
			<Box>
				<TextInput
					fullWidth
					label="Recipe title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					error={!!errors.title}
					helperText={errors.title}
				/>
			</Box>
			<TimeInput
				value={time}
				onChange={setTime}
				error={!!errors.time}
				helperText={errors.time}
			/>
			<IngredientInput
				value={ingredients}
				onChange={setIngredients}
				error={!!errors.ingredients}
				helperText={errors.ingredients}
			/>
			<StepsInput
				value={steps}
				onChange={setSteps}
				error={!!errors.steps}
				helperText={errors.steps}
			/>
			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<PrimaryButton
					variant="contained"
					sx={{ mt: 2, maxWidth: "10rem" }}
					onClick={handleSubmit}
				>
					{mode === "edit" ? "Save changes" : "Submit recipe"}
				</PrimaryButton>
			</Box>
		</Box>
	);
}
