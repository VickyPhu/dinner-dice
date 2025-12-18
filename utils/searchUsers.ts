"use server";

import { createClient } from "@/utils/supabase/server";

export async function searchUsers(query: string): Promise<string[]> {
	if (!query || query.length < 2) return [];

	const supabase = await createClient();

	const { data, error } = await supabase
		.from("profiles")
		.select("username")
		.ilike("username", `${query}%`) // case insensitive
		.limit(5);

	if (error || !data) {
		console.error(error);
		return [];
	}
	return data.map((u) => u.username);
}
