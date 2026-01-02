"use server";

import type { RecipeFormData } from "@/schemas/recipeSchema";
import { updateRecipe } from "./actions";

export async function updateRecipeProxy(
	groupId: string,
	date: string,
	values: RecipeFormData
): Promise<{ success: boolean; message?: string }> {
	try {
		await updateRecipe(groupId, date, values);
		return { success: true };
	} catch (err) {
		return {
			success: false,
			message: err instanceof Error ? err.message : "Unknown error occurred",
		};
	}
}
