"use server";

import { RecipeFormProp, updateRecipe } from "./actions";

export async function updateRecipeProxy(
	groupId: string,
	date: string,
	values: RecipeFormProp
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
