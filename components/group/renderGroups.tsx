"use client";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Container, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";

import CreateGroupModal from "@/components/create-group/createGroupModal";
import GroupCard from "@/components/group/groupCard";
import { useGroups } from "@/hooks/useGroups";
import useUser from "@/hooks/useUser";

export default function RenderGroups() {
	const [open, setOpen] = useState(false);
	const { groups, loading } = useGroups();
	const { profile, loading: profileLoading } = useUser();

	if (loading || profileLoading) return <p>Loading...</p>;
	if (loading) return <p>Loading groups...</p>;

	return (
		<Container>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				mt={2}
				sx={{
					background: "var(--card-bg)",
					padding: "0.5rem",
					borderTopRightRadius: "var(--card-radius)",
					borderTopLeftRadius: "var(--card-radius)",
				}}
			>
				<Typography variant="h1">
					{profile?.username ? `${profile.username}'s groups` : "My groups"}
				</Typography>

				<IconButton onClick={() => setOpen(true)}>
					<AddBoxOutlinedIcon
						sx={{ fontSize: { xs: 40, md: 45 }, color: "var(--text)" }}
					/>
				</IconButton>
			</Stack>

			<CreateGroupModal open={open} onClose={() => setOpen(false)} />

			<Stack>
				{groups.map(
					(group) => group && <GroupCard key={group.id} group={group} />
				)}
			</Stack>
		</Container>
	);
}
