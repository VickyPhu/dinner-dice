"use client";

import IngredientInput from "@/components/recipe/ingredientInput";
import StepsInput from "@/components/recipe/stepsInput";
import TimeInput from "@/components/recipe/timeInput";
import { Container } from "@mui/material";
import { useState } from "react";

export default function SubmitRecipePage() {
	const [totalTime, setTotalTime] = useState("");
	const [ingredients, setIngredients] = useState<string[]>([]);
	const [steps, setSteps] = useState<string[]>([]);

	return (
		<Container>
			<TimeInput value={totalTime} onChange={setTotalTime} />
			<IngredientInput value={ingredients} onChange={setIngredients} />
			<StepsInput value={steps} onChange={setSteps} />
		</Container>
	);
}
