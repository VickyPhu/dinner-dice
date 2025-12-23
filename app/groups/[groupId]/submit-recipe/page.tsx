import Header from "@/components/header";
import SubmitRecipes from "@/components/recipe/submitRecipes";
import { calculateNextSharing } from "@/utils/calculateNextSharing";
import { createClient } from "@/utils/supabase/server";
import { Box } from "@mui/material";

export default async function SubmitRecipePage({
	params,
}: {
	params: Promise<{ groupId: string }>;
}) {
	const { groupId } = await params;
	console.log("groupId:", groupId);

	const supabase = await createClient();

	// Fetch user
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return <div>You must be logged in.</div>;
	}

	// Fetch info about group from Supabase
	const { data: group, error } = await supabase
		.from("groups")
		.select("*")
		.eq("id", groupId)
		.single();

	if (error || !group) {
		return <div>Group not found.</div>;
	}

	// Calculate which dates the user have to send in recipes for
	const offsets = calculateNextSharing(group.weekdays, group.sharing_frequency);
	const today = new Date();
	const dates = offsets.map((d) => {
		const date = new Date(today);
		date.setDate(today.getDate() + d);
		return date.toISOString().slice(0, 10);
	});

	// Fetch all recipes for the dates
	const { data: recipes } = await supabase
		.from("recipes")
		.select("*")
		.eq("group_id", groupId)
		.eq("user_id", user.id)
		.in("for_date", dates);

	const recipeMap = Object.fromEntries(
		dates.map((d) => [d, recipes?.find((r) => r.for_date === d) ?? null])
	);

	return (
		<Box>
			<Header variant="back" backHref={`/groups/${groupId}`} />
			<SubmitRecipes groupId={groupId} dates={dates} recipeMap={recipeMap} />
		</Box>
	);
}
