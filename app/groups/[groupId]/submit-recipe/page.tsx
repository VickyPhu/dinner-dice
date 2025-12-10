"use client";

import IngredientInput from "@/components/recipe/ingredientInput";
import { Container } from "@mui/material";
import { useState } from "react";

export default function SubmitRecipePage() {
	const [ingredients, setIngredients] = useState<string[]>([]);
	return (
		<Container>
			<IngredientInput value={ingredients} onChange={setIngredients} />
		</Container>
	);
}
