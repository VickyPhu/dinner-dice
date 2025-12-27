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
		<Box sx={{ margin: { xs: "1rem", md: "1rem 2rem" } }}>
			{assignments.map((assignment) => (
				<Box key={assignment.id} mb={2}>
					<Typography variant="h1" sx={{ mb: "1rem" }}>
						Your assigned recipes
					</Typography>
					<Typography variant="body2">
						For date: {new Date(assignment.for_date).toLocaleDateString()}
					</Typography>

					<RecipeRevealCard recipe={assignment.recipe} />
				</Box>
			))}
		</Box>
	);
}
