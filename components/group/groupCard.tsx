"use client";

import { GroupData } from "@/hooks/useGroups";
import { calculateNextSharing } from "@/utils/calculateNextSharing";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Avatar, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function GroupCard({ group }: { group: GroupData }) {
	const router = useRouter();

	return (
		<Paper
			variant="outlined"
			onClick={() => router.push(`/groups/${group.id}`)}
		>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<Typography variant="h2">{group.name}</Typography>
				<Avatar>
					<ArrowForwardIosIcon />
				</Avatar>
			</Stack>
			<Typography variant="body1">
				Next sharing in: {calculateNextSharing(group.weekdays)} days
			</Typography>
		</Paper>
	);
}
