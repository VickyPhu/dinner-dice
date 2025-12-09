"use client";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Container, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";

import CreateGroupModal from "@/components/create-group/createGroupModal";
import GroupCard from "@/components/group/groupCard";
import { useGroups } from "@/hooks/useGroups";
import { signOut } from "../auth/actions";

export default function MyGroupsPage() {
	const [open, setOpen] = useState(false);
	const { groups, loading } = useGroups();

	if (loading) return <p>Loading groups...</p>;

	return (
		<Container>
			<form action={signOut}>
				<button type="submit">Sign out</button>
			</form>

			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				mb={2}
			>
				<Typography variant="h1">My Groups</Typography>

				<IconButton onClick={() => setOpen(true)}>
					<AddBoxOutlinedIcon />
				</IconButton>
			</Stack>

			<CreateGroupModal open={open} onClose={() => setOpen(false)} />

			<Stack>
				{groups.map((group) => (
					<GroupCard key={group.id} group={group} />
				))}
			</Stack>
		</Container>
	);
}
