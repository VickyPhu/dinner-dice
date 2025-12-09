"use client";

import { Group } from "@/hooks/useGroups";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function GroupCard({ group }: { group: Group }) {
	const router = useRouter();

	return (
		<Paper variant="outlined" onClick={() => router.push(`/groups/${group.id}`)}>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<Box>
					<Typography variant="h2">{group.name}</Typography>
				</Box>
				<Avatar>
					<ArrowForwardIosIcon />
				</Avatar>
			</Stack>
		</Paper>
	);
}
