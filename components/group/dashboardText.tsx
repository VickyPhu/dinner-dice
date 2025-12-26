import { GroupMember } from "@/hooks/useGroupMembers";
import { GroupData } from "@/hooks/useGroups";
import { calculateNextSharing } from "@/utils/calculateNextSharing";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Box, Typography } from "@mui/material";

interface Props {
	group?: GroupData;
	members: GroupMember[];
}

export default function DashboardText({ group, members }: Props) {
	if (!group) return null;

	return (
		<Box>
			{/* Group name */}
			<Typography variant="h1" mb={2}>
				Group: {group.name}
			</Typography>

			{/* Next sharing day */}
			<Typography variant="body1">
				Next sharing in:{" "}
				{calculateNextSharing(group.weekdays, group.sharing_frequency).join(
					", "
				)}{" "}
				days
			</Typography>

			{/* Group members */}
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
		</Box>
	);
}
