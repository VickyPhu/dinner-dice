import { createClient } from "@/utils/supabase/server";

export async function assignRecipes() {
	const supabase = await createClient();

	const today = new Date();

	const { data: groups, error } = await supabase
		.from("groups")
		.select("id, weekdays");

	if (error || !groups) return;

	for (const group of groups) {
		const forDate = findSharingDateInTwoDays(group.weekdays);
		if (!forDate) continue;

		// Protection: don't run again
		const { data: existing } = await supabase
			.from("recipe_assignments")
			.select("id")
			.eq("group_id", group.id)
			.eq("for_date", forDate);

		if (existing && existing.length > 0) continue;

		// Get all the submitted recipes within the group and for the specific day
		const { data: recipes } = await supabase
			.from("recipes")
			.select("id, user_id")
			.eq("group_id", group.id)
			.eq("for_date", forDate);

		if (!recipes || recipes.length < 2) continue;

		const { data: members } = await supabase
			.from("group_members")
			.select("user_id")
			.eq("group_id", group.id);

		if (!members) continue;

		// A member of the group should not be able to receive their own submitted recipe
		for (const member of members) {
			const possible = recipes.filter((r) => r.user_id.id !== member.user_id);

			if (possible.length === 0) continue;

			const recipe = possible[Math.floor(Math.random() * possible.length)];

			await supabase.from("recipe_assignment").insert({
				group_id: group.id,
				recipe_id: recipe.id,
				assigned_to: member.user_id,
				for_date: forDate,
				reveal_at: new Date(today.getTime() + 2 * 86400000).toISOString(), // Two days before sharing date
			});
		}
	}
}

function findSharingDateInTwoDays(weekdays: string[]) {
	const d = new Date();
	d.setDate(d.getDate() + 2);
	const weekday = d.toLocaleDateString("en-US", { weekday: "short" });

	return weekdays.includes(weekday) ? d.toISOString().slice(0, 10) : null;
}
