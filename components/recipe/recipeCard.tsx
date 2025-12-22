import { Recipe } from "@/hooks/useAssignedRecipes";
import { Button } from "@mui/material";
import RecipeRevealCard from "./recipeRevealCard";

interface RecipeCardProps {
	recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
	return (
		<RecipeRevealCard
			recipe={recipe}
			actions={
				<>
					<Button>Rate recipe</Button>
					<Button>See reviews</Button>
				</>
			}
		/>
	);
}
