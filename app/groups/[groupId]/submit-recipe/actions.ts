"use server";

import { createClient } from "@/utils/supabase/server";

export interface RecipeFormProp {
	title: string;
	time: string;
	ingredients: string[];
	steps: string[];
}

export async function submitRecipe(
	groupId: string,
	date: string,
	recipe: RecipeFormProp
) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) throw new Error("Not logged in");

	const { error } = await supabase.from("recipes").insert({
		group_id: groupId,
		user_id: user.id,
		for_date: date,
		title: recipe.title,
		time: recipe.time,
		ingredients: recipe.ingredients,
		steps: recipe.steps,
	});

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}
}
