import Header from "@/components/header";
import SmallRecipeCard from "@/components/recipe/smallRecipeCard";
import { getRecipes } from "@/utils/getRecipes";
import { Box, Typography } from "@mui/material";

export default async function RecipesPage({
	params,
}: {
	params: { groupId: string };
}) {
	const { groupId } = await params;

	const recipes = await getRecipes(groupId);

	if (recipes.length === 0) {
		return <Typography>No recipes yet.</Typography>;
	}

	return (
		<Box>
			<Header variant="back" backHref={`/groups/${groupId}`} />
			<SmallRecipeCard recipes={recipes} groupId={groupId} />
		</Box>
	);
}
