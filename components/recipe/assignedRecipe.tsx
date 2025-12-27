"use client";

import { useAssignedRecipes } from "@/hooks/useAssignedRecipes";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import RecipeRevealCard from "./recipeRevealCard";

export default function AssignedRecipePage() {
	const params = useParams();
	const groupId = params.groupId as string;

	const { assignments, loading } = useAssignedRecipes(groupId);

	if (loading) {
		return (
			<Box>
				<Typography>Loading...</Typography>
			</Box>
		);
	}

	if (!assignments || assignments.length === 0) {
		return (
			<Box>
				<Typography>No recipe assigned yet</Typography>
				<Typography>
					Your recipe will be revealed 2 days before the sharing date
				</Typography>
			</Box>
		);
	}

	return (
		<Box>
			{assignments.map((assignment) => (
				<Box key={assignment.id} mb={2}>
					<Typography variant="h1">Your assigned recipes</Typography>
					<Typography variant="subtitle2" color="text.secondary">
						For date: {new Date(assignment.for_date).toLocaleDateString()}
					</Typography>

					<RecipeRevealCard recipe={assignment.recipe} />
				</Box>
			))}
		</Box>
	);
}
