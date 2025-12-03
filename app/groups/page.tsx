"use client";

import CreateGroupModal from "@/components/createGroupModal";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Container, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { signOut } from "../auth/actions";

export default function MyGroupsPage() {
	const [open, setOpen] = useState(false);
	return (
		<Container>
			<Typography variant="h1">Welcome User</Typography>
			<form action={signOut}>
				<button type="submit">Sign out</button>
			</form>
			<IconButton onClick={() => setOpen(true)} aria-label="create group">
				<AddBoxOutlinedIcon />
			</IconButton>
			<CreateGroupModal open={open} onClose={() => setOpen(false)} />
		</Container>
	);
}
