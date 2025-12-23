import Header from "@/components/header";
import AssignedRecipe from "@/components/recipe/assignedRecipe";
import { Box } from "@mui/material";

export default async function AssignedRecipePage({
	params,
}: {
	params: Promise<{ groupId: string }>;
}) {
	const { groupId } = await params;
	return (
		<Box>
			<Header variant="back" backHref={`/groups/${groupId}`} />
			<AssignedRecipe />
		</Box>
	);
}
