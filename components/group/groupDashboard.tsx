"use client";

import { useGroups } from "@/hooks/useGroups";
import { Box, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import MenuCard from "./menuCard";

export default function GroupDashboard() {
	const params = useParams();
	const router = useRouter();
	const groupId = params.groupId;
	const { groups, loading } = useGroups();
	const group = groups.find((g) => g.id === groupId);

	return (
		<Box sx={{ margin: "1rem 0rem 0rem 1.5rem" }}>
			<Typography variant="h1">
				{loading ? "Loading..." : `Group: ${group?.name ?? "Unknown group"}`}
			</Typography>
			<Box display={"flex"} gap={5}>
				<MenuCard
					onClick={() => router.push(`/groups/${groupId}/submit-recipe`)}
				>
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
		</Box>
	);
}
