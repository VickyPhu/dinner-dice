"use client";

import { deleteRecipe } from "@/app/groups/[groupId]/recipes/[recipeId]/actions";
import { BaseRecipe, Recipe } from "@/hooks/useAssignedRecipes";
import { useToastStore } from "@/stores/toastStore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PrimaryButton from "../buttons/primaryButton";
import SecondaryButton from "../buttons/secondaryButton";
import ConfirmModal from "../confirmModal";
import RecipeRevealCard from "./recipeRevealCard";

interface RecipeCardProps {
	recipe: Recipe | BaseRecipe;
	groupId: string;
}

export default function RecipeCard({ recipe, groupId }: RecipeCardProps) {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const { addToast } = useToastStore();

	const handleDelete = async () => {
		await deleteRecipe(recipe.id, groupId);
		setOpen(false);

		addToast({
			message: "Recipe was successfully deleted",
			type: "success",
		});

		router.push(`/groups/${groupId}/recipes`);
	};

	return (
		<>
			<IconButton onClick={() => setOpen(true)}>
				<DeleteOutlineIcon />
			</IconButton>
			<RecipeRevealCard
				recipe={recipe}
				showUsername
				titleVariant="h1"
				actions={
					<>
						<Typography variant="body2" color={"var(--text)"}>
							Coming soon...
						</Typography>
						<PrimaryButton disabled>Rate recipe</PrimaryButton>
						<SecondaryButton disabled>See reviews</SecondaryButton>
					</>
				}
			/>
			<ConfirmModal
				open={open}
				title="Delete recipe?"
				description="Are you sure you want to delete this recipe? This action can't be undone"
				confirmText="Delete"
				onConfirm={handleDelete}
				onClose={() => setOpen(false)}
			/>
		</>
	);
}
