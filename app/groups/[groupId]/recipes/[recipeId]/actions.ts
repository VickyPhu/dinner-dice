"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteRecipe(recipeId: string, groupId: string) {
	const supabase = await createClient();

	await supabase.from("recipes").delete().eq("id", recipeId);

	revalidatePath(`/groups/${groupId}/recipes`);
}
