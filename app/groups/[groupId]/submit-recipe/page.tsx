"use client";

import IngredientInput from "@/components/recipe/ingredientInput";
import StepsInput from "@/components/recipe/stepsInput";
import { Container } from "@mui/material";
import { useState } from "react";

export default function SubmitRecipePage() {
	const [ingredients, setIngredients] = useState<string[]>([]);
	const [steps, setSteps] = useState<string[]>([]);

	return (
		<Container>
			<IngredientInput value={ingredients} onChange={setIngredients} />
			<StepsInput value={steps} onChange={setSteps} />
		</Container>
	);
}
