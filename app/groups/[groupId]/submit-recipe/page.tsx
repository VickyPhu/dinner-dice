"use client";

import SubmitRecipeForm from "@/components/recipe/submitRecipeForm";
import { Box, Container, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { RecipeFormProp, submitRecipe } from "./actions";

export default function SubmitRecipePage() {
	const params = useParams();
	const groupId = params.groupId as string;

	async function handleSubmit(values: RecipeFormProp) {
		const today = new Date().toISOString().slice(0, 10);
		await submitRecipe(groupId, today, values);
	}

	return (
		<Container>
			<Box>
				<Typography variant="h1">Submit this week&apos;s recipe</Typography>
				<SubmitRecipeForm onSubmit={handleSubmit} />
			</Box>
		</Container>
	);
}
