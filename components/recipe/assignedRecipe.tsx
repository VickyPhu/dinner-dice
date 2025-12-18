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
			</Box>
		);

	const now = new Date();
	const revealAt = new Date(assignment.reveal_at);
	const isRevealed = new Date() >= new Date(assignment.reveal_at);

	if (!isRevealed) {
		const daysLeft = Math.ceil((revealAt.getTime() - now.getTime()) / 86400000);

		return (
			<Box>
				<Typography>
					Your recipe will be revealed on {revealAt.toLocaleDateString()}
				</Typography>
				<Typography>
					In {daysLeft} day{daysLeft !== 1 && "s"}
				</Typography>
			</Box>
		);
	}
	return (
		<Box>
			<RecipeRevealCard recipe={assignment.recipe} />
		</Box>
	);
}
