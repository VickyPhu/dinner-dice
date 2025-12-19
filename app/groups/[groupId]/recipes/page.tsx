import SmallRecipeCard from "@/components/recipe/smallRecipeCard";
import { getRecipes } from "@/utils/getRecipes";
import { Box, Typography } from "@mui/material";

export default async function RecipesPage({
	params,
}: {
	params: Promise<{ groupId: string }>;
}) {
	const { groupId } = await params;

	const recipes = await getRecipes(groupId);

	if (recipes.length === 0) {
		return <Typography>No recipes yet.</Typography>;
	}

	return (
		<Box>
			<SmallRecipeCard recipes={recipes} />
		</Box>
	);
}