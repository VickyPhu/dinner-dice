"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteRecipe(recipeId: string, groupId: string) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("Not authenticated");
	}

	const { error } = await supabase
		.from("recipes")
		.delete()
		.eq("id", recipeId)
		.eq("user_id", user.id);

	if (error) {
		throw new Error("You are not allowed to delete this recipe");
	}

	revalidatePath(`/groups/${groupId}/recipes`);
}
