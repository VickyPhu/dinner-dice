"use server";

import { recipeSchema } from "@/schemas/recipeSchema";
import { assignRecipes } from "@/utils/assignRecipes";
import { createClient } from "@/utils/supabase/server";

export async function submitRecipe(
	groupId: string,
	date: string,
	recipe: unknown
) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) throw new Error("Not logged in");

	const parsed = recipeSchema.safeParse(recipe);

	if (!parsed.success) {
		throw new Error("Invalid recipe data");
	}

	const { title, time, ingredients, steps } = parsed.data;

	const { error } = await supabase.from("recipes").insert({
		group_id: groupId,
		user_id: user.id,
		for_date: date,
		title,
		time,
		ingredients,
		steps,
	});

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}
	// Trigger assign recipes directly
	await assignRecipes();
}

export async function updateRecipe(
	groupId: string,
	date: string,
	recipe: unknown
) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) throw new Error("Not authenticated");

	const parsed = recipeSchema.safeParse(recipe);
	if (!parsed.success) {
		throw new Error("Invalid recipe data");
	}

	const { title, time, ingredients, steps } = parsed.data;

	const { error } = await supabase
		.from("recipes")
		.update({
			title,
			time,
			ingredients,
			steps,
		})
		.eq("group_id", groupId)
		.eq("user_id", user.id)
		.eq("for_date", date);

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}
}
