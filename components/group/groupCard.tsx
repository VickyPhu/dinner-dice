"use client";

import { GroupData } from "@/hooks/useGroups";
import { useGroupSubmissions } from "@/hooks/useGroupSubmissions";
import { calculateNextSharing } from "@/utils/calculateNextSharing";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Avatar, Box, Link, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function GroupCard({
	group,
	isLast,
}: {
	group: GroupData;
	isLast?: boolean;
}) {
	const router = useRouter();
	const { submittedCount, requiredCount, loading } = useGroupSubmissions(group);

	return (
		<Box
			component={Link}
			onClick={() => router.push(`/groups/${group.id}`)}
			sx={{
				background: "var(--card-bg)",
				borderBottom: "1px solid var(--button2-shadow)",
				paddingInline: "0.5rem",
				paddingBlock: "0.7rem",
				cursor: "pointer",
				textDecoration: "none",
				color: "inherit",
				borderBottomLeftRadius: isLast ? "var(--card-radius)" : 0,
				borderBottomRightRadius: isLast ? "var(--card-radius)" : 0,
			}}
		>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<Typography variant="h2">{group.name}</Typography>
				<Avatar>
					<ArrowForwardIosIcon />
				</Avatar>
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
