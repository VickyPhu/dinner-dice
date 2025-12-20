import { supabaseAdmin } from "./supabase/admin";

export async function assignRecipes() {
	const daysAhead = 7;

	const { data: groups, error } = await supabaseAdmin
		.from("groups")
		.select("id, weekdays");

	if (error || !groups) {
		console.error("Failed to fetch groups", error);
		return;
	}

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	for (const group of groups) {
		for (let i = 0; i <= daysAhead; i++) {
			const date = new Date(today);
			date.setDate(today.getDate() + i);

			const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
			if (!group.weekdays.includes(weekday)) continue;

			const forDate = date.toISOString().slice(0, 10);

			// Protection, check if there's already an assignment for this day
			const { data: existing } = await supabaseAdmin
				.from("recipe_assignments")
				.select("id")
				.eq("group_id", group.id)
				.eq("for_date", forDate);

			if (existing && existing.length > 0) continue;

			// Get recipes for this day
			const { data: recipes } = await supabaseAdmin
				.from("recipes")
				.select("id, user_id")
				.eq("group_id", group.id)
				.eq("for_date", forDate);

			if (!recipes || recipes.length === 0) continue;

			const { data: members } = await supabaseAdmin
				.from("group_members")
				.select("user_id")
				.eq("group_id", group.id);

			if (!members) continue;

			for (const member of members) {
				const possible = recipes.filter((r) => r.user_id !== member.user_id);

				if (possible.length === 0) continue;

				const recipe = possible[Math.floor(Math.random() * possible.length)];

				// Reveal recipes two days before for_date
				const revealAt = new Date(forDate);
				revealAt.setDate(revealAt.getDate() - 2);

				await supabaseAdmin.from("recipe_assignments").insert({
					group_id: group.id,
					recipe_id: recipe.id,
					assigned_to: member.user_id,
					for_date: forDate,
					reveal_at: revealAt.toISOString(),
				});
			}
		}
	}
}
