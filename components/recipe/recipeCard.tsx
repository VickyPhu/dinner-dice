"use client";

import { deleteRecipe } from "@/app/groups/[groupId]/recipes/[recipeId]/actions";
import { Recipe } from "@/hooks/useAssignedRecipes";
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

	const handleDelete = async () => {
		await deleteRecipe(recipe.id, groupId);
		setOpen(false);
		router.push(`/groups/${groupId}/recipes`);
	};

	return (
		<>
			<Button onClick={() => router.push(`/groups/${groupId}/recipes`)}>
				Go back
			</Button>
			<Button
				onClick={() =>
					router.push("/groups/c629b766-43c0-45a8-815e-3b4536838e5f/recipes")
				}
			>
				Test
			</Button>
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
