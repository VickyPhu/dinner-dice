import { createClient } from "@/utils/supabase/server";

export interface RecipeListItem {
	id: string;
	title: string;
	time: string;
	user_id: string;
	username: string;
}

export async function getRecipes(groupId: string): Promise<RecipeListItem[]> {
	const supabase = await createClient();

	// Get recipes from within the group
	const { data: recipes, error: recipesError } = await supabase
		.from("recipes")
		.select("id, title, time, user_id")
		.eq("group_id", groupId)
		.lte("for_date", new Date().toISOString().slice(0, 10)); // Only show earlier recipes or the ones for today

	if (recipesError) {
		console.error("Failed to fetch recipes", recipesError);
		return [];
	}

	if (!recipes || recipes.length === 0) return [];

	// Get usernames for all the user_id in the recipes
	const { data: profiles, error: profilesError } = await supabase
		.from("profiles")
		.select("user_id, username")
		.in(
			"user_id",
			recipes.map((r) => r.user_id)
		);

	if (profilesError) {
		console.error("Failed to fetch profiles", profilesError);
		return recipes.map((r) => ({ ...r, username: "Unknown" }));
	}

	return recipes.map((r) => ({
		...r,
		username:
			profiles?.find((p) => p.user_id === r.user_id)?.username ?? "Unknown",
	}));
}
