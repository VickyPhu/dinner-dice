import { createClient } from "@/utils/supabase/server";

export interface RecipeListItem {
	id: string;
	title: string;
	time: string;
}

export async function getRecipes(groupId: string): Promise<RecipeListItem[]> {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("recipes")
		.select("id, title, time, group_id")
		.eq("group_id", groupId)
		.lte("for_date", new Date().toISOString().slice(0, 10)); // Only show earlier recipes or the ones for today

	if (error) {
		console.error("Failed to fetch recipes", error);
		return [];
	}
	return data ?? [];
}
