"use server";

import type { RecipeFormData } from "@/schemas/recipeSchema";
import { submitRecipe } from "./actions";

export async function submitRecipeProxy(
	groupId: string,
	date: string,
	values: RecipeFormData
): Promise<{ success: boolean; message?: string }> {
	try {
		await submitRecipe(groupId, date, values);
		return { success: true };
	} catch (err) {
		return {
			success: false,
			message: err instanceof Error ? err.message : "Unknown error occurred",
		};
	}
}
