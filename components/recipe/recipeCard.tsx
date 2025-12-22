"use client";

import { deleteRecipe } from "@/app/groups/[groupId]/recipes/[recipeId]/actions";
import { Recipe } from "@/hooks/useAssignedRecipes";
import { useToastStore } from "@/stores/toastStore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmModal from "../confirmModal";
import RecipeRevealCard from "./recipeRevealCard";

interface RecipeCardProps {
	recipe: Recipe;
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
				actions={
					<>
						<Button>Rate recipe</Button>
						<Button>See reviews</Button>
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
