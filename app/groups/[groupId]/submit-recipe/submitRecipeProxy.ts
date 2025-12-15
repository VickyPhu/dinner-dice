"use server";

import type { RecipeFormProp } from "./actions";
import { submitRecipe } from "./actions";

export async function submitRecipeProxy(
	groupId: string,
	date: string,
	values: RecipeFormProp
): Promise<{ success: boolean; message?: string }> {
	try {
		await submitRecipe(groupId, date, values);
		return { success: true };
	} catch (err) {
		const message =
			err instanceof Error ? err.message : "Unknown error occurred";
		return { success: false, message };
	}
}
