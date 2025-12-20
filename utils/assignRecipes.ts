import { supabaseAdmin } from "./supabase/admin";

interface Recipe {
	id: string;
	user_id: string;
}

const daysAhead = 7;

export async function assignRecipes() {
	const groups = await getGroups();
	if (!groups.length) return;

	const today = startOfDay(new Date());

	for (const group of groups) {
		const sharingDates = getSharingDates(today, group.weekdays, daysAhead);

		for (const forDate of sharingDates) {
			await assignForGroupAndDate(group.id, forDate);
		}
	}
}

// Fetch groups
async function getGroups() {
	const { data, error } = await supabaseAdmin
		.from("groups")
		.select("id, weekdays");

	if (error) {
		console.error("Failed to fetch groups", error);
		return [];
	}

	return data ?? [];
}

// Fetch all the sharing days
function getSharingDates(
	startDate: Date,
	weekdays: string[],
	daysAhead: number
): string[] {
	const dates: string[] = [];

	for (let i = 0; i <= daysAhead; i++) {
		const d = new Date(startDate);
		d.setDate(startDate.getDate() + i);

		const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
		if (weekdays.includes(weekday)) {
			dates.push(d.toISOString().slice(0, 10));
		}
	}

	return dates;
}

// Assign recipe for one group + one day
async function assignForGroupAndDate(groupId: string, forDate: string) {
	if (await assignmentsExist(groupId, forDate)) return;

	const recipes = await getRecipesForDate(groupId, forDate);
	if (!recipes.length) return;

	const members = await getGroupMembers(groupId);
	if (!members.length) return;

	for (const member of members) {
		const recipe = pickRandomRecipe(recipes, member.user_id);
		if (!recipe) continue;

		await createAssignment({
			groupId,
			forDate,
			recipeId: recipe.id,
			assignedTo: member.user_id,
		});
	}
}

// Check to see if assignment already exists
async function assignmentsExist(groupId: string, forDate: string) {
	const { data } = await supabaseAdmin
		.from("recipe_assignments")
		.select("id")
		.eq("group_id", groupId)
		.eq("for_date", forDate)
		.limit(1);

	return !!data?.length;
}

// Fetch recipe for today
async function getRecipesForDate(groupId: string, forDate: string) {
	const { data } = await supabaseAdmin
		.from("recipes")
		.select("id, user_id")
		.eq("group_id", groupId)
		.eq("for_date", forDate);

	return data ?? [];
}

// Get group members
async function getGroupMembers(groupId: string) {
	const { data } = await supabaseAdmin
		.from("group_members")
		.select("user_id")
		.eq("group_id", groupId);

	return data ?? [];
}

// Shuffle recipes, should not be able to receive your own
function pickRandomRecipe(
	recipes: readonly Recipe[],
	userId: string
): Recipe | null {
	const possible = recipes.filter((r) => r.user_id !== userId);

	return possible.length
		? possible[Math.floor(Math.random() * possible.length)]
		: null;
}

// Create assignment
async function createAssignment({
	groupId,
	forDate,
	recipeId,
	assignedTo,
}: {
	groupId: string;
	forDate: string;
	recipeId: string;
	assignedTo: string;
}) {
	const revealAt = new Date(forDate);
	revealAt.setDate(revealAt.getDate() - 2);

	await supabaseAdmin.from("recipe_assignments").insert({
		group_id: groupId,
		recipe_id: recipeId,
		assigned_to: assignedTo,
		for_date: forDate,
		reveal_at: revealAt.toISOString(),
	});
}

// Help with the date
function startOfDay(date: Date) {
	const d = new Date(date);
	d.setHours(0, 0, 0, 0);
	return d;
}
