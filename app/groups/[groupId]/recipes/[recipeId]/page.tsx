import RecipeCard from "@/components/recipe/recipeCard";
import { createClient } from "@/utils/supabase/server";
import { Box } from "@mui/material";
import { notFound } from "next/navigation";

export default async function SpecificRecipePage({
	params,
}: {
	params: Promise<{ groupId: string; recipeId: string }>;
}) {
	const { recipeId } = await params;
	const supabase = await createClient();

	const { data: recipe, error } = await supabase
		.from("recipes")
		.select("id, title, time, ingredients, steps")
		.eq("id", recipeId)
		.single();

	if (error || !recipe) {
		notFound();
	}

	return (
		<Box>
			<RecipeCard recipe={recipe} />
		</Box>
	);
}
