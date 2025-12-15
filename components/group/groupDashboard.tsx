"use client";

import { Box, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import MenuCard from "./menuCard";

export default function GroupDashboard() {
	const params = useParams();
	const router = useRouter();
	const groupId = params.groupId;

	return (
		<Box>
			<Typography variant="h1">Group: {groupId}</Typography>
			<MenuCard onClick={() => router.push(`/groups/${groupId}/submit-recipe`)}>
				<Typography variant="h2">Submit this week&apos;s recipe</Typography>
			</MenuCard>
			<MenuCard
				onClick={() => router.push(`/groups/${groupId}/assigned-recipe`)}
			>
				<Typography variant="h2">See assigned recipe</Typography>
			</MenuCard>
			<MenuCard onClick={() => router.push(`/groups/${groupId}/recipes`)}>
				<Typography variant="h2">All recipes</Typography>
			</MenuCard>
		</Box>
	);
}
