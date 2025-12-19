"use client";

import { useAssignedRecipe } from "@/hooks/useAssignedRecipes";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import RecipeRevealCard from "./recipeRevealCard";

export default function AssignedRecipePage() {
	const params = useParams();
	const groupId = params.groupId as string;

	const { assignment, loading } = useAssignedRecipe(groupId);

	if (loading)
		return (
			<Box>
				<Typography>Loading...</Typography>
			</Box>
		);
	if (!assignment)
		return (
			<Box>
				<Typography>No recipe assigned yet</Typography>
				<Typography>
					Your recipe will be revealed 2 days before the sharing date
				</Typography>
			</Box>
		);

	return (
		<Box>
			<RecipeRevealCard recipe={assignment.recipe} />
		</Box>
	);
}
