"use client";

import { GroupData } from "@/hooks/useGroups";
import { useGroupSubmissions } from "@/hooks/useGroupSubmissions";
import { calculateNextSharing } from "@/utils/calculateNextSharing";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function GroupCard({
	group,
	isLast,
}: {
	group: GroupData;
	isLast?: boolean;
}) {
	const { submittedCount, requiredCount, loading } = useGroupSubmissions(group);

	return (
		<Box
			component={Link}
			href={`/groups/${group.id}`}
			sx={{
				background: "var(--card-bg)",
				borderBottom: "1px solid var(--button2-shadow)",
				padding: "1rem",
				cursor: "pointer",
				textDecoration: "none",
				color: "inherit",
				borderBottomLeftRadius: isLast ? "var(--card-radius)" : 0,
				borderBottomRightRadius: isLast ? "var(--card-radius)" : 0,
				boxShadow: "1px 2px 4px var(--card-shadow)",
				"&:hover svg": {
					transform: "translateX(2px)",
				},
			}}
		>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				paddingRight="0.5rem"
			>
				<Typography variant="h2">{group.name}</Typography>
				<ArrowForwardIosIcon sx={{ color: "var(--text)" }} />
			</Stack>
			<Typography variant="body1">
				Next sharing in:{" "}
				{calculateNextSharing(group.weekdays, group.sharing_frequency).join(
					", "
				)}{" "}
				days
			</Typography>
			{!loading && (
				<Typography>
					{submittedCount}/{requiredCount} recipes submitted
				</Typography>
			)}
		</Box>
	);
}
