import Header from "@/components/header";
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
	const { groupId } = await params;
	const supabase = await createClient();

	const { data: recipe, error } = await supabase
		.from("recipes")
		.select("id, title, time, ingredients, steps, user_id")
		.eq("id", recipeId)
		.single();

	if (error || !recipe) {
		notFound();
	}

	const { data: profile } = await supabase
		.from("profiles")
		.select("username")
		.eq("user_id", recipe.user_id)
		.single();

	return (
		<Box>
			<Header variant="back" backHref={`/groups/${groupId}/recipes`} />
			<RecipeCard
				recipe={{ ...recipe, username: profile?.username }}
				groupId={groupId}
			/>
		</Box>
	);
}
