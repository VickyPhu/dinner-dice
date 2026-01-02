"use client";

import { useGroupMember } from "@/hooks/useGroupMembers";
import { useGroups } from "@/hooks/useGroups";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import DashboardText from "./dashboardText";
import MenuCard from "./menuCard";

export default function GroupDashboard() {
	const params = useParams();
	const groupId =
		typeof params.groupId === "string" ? params.groupId : undefined;
	const { groups } = useGroups();
	const { members } = useGroupMember(groupId);

	const group = groups.find((g) => g.id === groupId);

	return (
		<Box sx={{ margin: "1rem 1.5rem" }}>
			<DashboardText group={group} members={members} />

			<Box
				sx={{
					display: "flex",
					gap: { xs: 2, md: 5 },
					flexDirection: { xs: "column", md: "row" },
				}}
			>
				<MenuCard href={`/groups/${groupId}/submit-recipe`}>
					<Typography variant="h2">Submit this week&apos;s recipe</Typography>
				</MenuCard>
				<MenuCard href={`/groups/${groupId}/assigned-recipe`}>
					<Typography variant="h2">See assigned recipe</Typography>
				</MenuCard>
				<MenuCard href={`/groups/${groupId}/recipes`}>
					<Typography variant="h2">All recipes</Typography>
				</MenuCard>
			</Box>
		</Box>
	);
}
