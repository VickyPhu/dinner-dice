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

	return (
		<Box sx={{ margin: { xs: "1rem", md: "1rem 2rem" } }}>
			<Header variant="back" backHref={`/groups/${groupId}`} />

			<Typography variant="h1" sx={{ mb: 2, ml: 2.5 }}>
				All recipes
			</Typography>

			{recipes.length === 0 ? (
				<Typography sx={{ ml: 2.5 }}>No recipes yet.</Typography>
			) : (
				<SmallRecipeCard recipes={recipes} groupId={groupId} />
			)}
		</Box>
	);
}
