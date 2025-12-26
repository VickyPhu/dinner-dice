"use client";

import { useGroupMember } from "@/hooks/useGroupMembers";
import { useGroups } from "@/hooks/useGroups";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Box, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import MenuCard from "./menuCard";

export default function GroupDashboard() {
	const params = useParams();
	const router = useRouter();
	const groupId =
		typeof params.groupId === "string" ? params.groupId : undefined;
	const { groups, loading } = useGroups();
	const group = groups.find((g) => g.id === groupId);
	const { members } = useGroupMember(groupId);

	return (
		<Box sx={{ margin: "1rem 1.5rem" }}>
			<Typography variant="h1" mb={2}>
				{loading ? "Loading..." : `Group: ${group?.name ?? "Unknown group"}`}
			</Typography>

			<Box display="flex" alignItems="center" gap={1}>
				<PersonOutlineIcon />
				<Box sx={{ display: { xs: "block", sm: "none" } }}>
					<Typography>
						{members.length} member{members.length !== 1 ? "s" : ""}
					</Typography>
				</Box>
				<Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
					{members.map((m) => (
						<Typography key={m.user_id}>
							{m.username ?? "Unknown user"}
						</Typography>
					))}
				</Box>
			</Box>

			<Box
				sx={{
					display: "flex",
					gap: { xs: 2, md: 5 },
					flexDirection: { xs: "column", md: "row" },
				}}
			>
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
