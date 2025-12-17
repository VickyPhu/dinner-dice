"use client";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

type Invite = {
	type: "email" | "username";
	value: string;
};

export default function InviteMembersField() {
	const { setValue, watch } = useFormContext();
	const invites = watch("invites") as Invite[];

	const [inputValue, setInputValue] = useState("");

	const addInvite = () => {
		const value = inputValue.trim().toLowerCase();
		if (!value) return;

		const isEmail = value.includes("@");

		const invite = {
			type: isEmail ? "email" : "username",
			value,
		};

		if (!invites.some((i) => i.value === value)) {
			setValue("invites", [...invites, invite], { shouldValidate: true });
		}
		setInputValue("");
	};

	const removeInvite = (value: string) => {
		setValue(
			"invites",
			invites.filter((i) => i.value !== value),
			{ shouldValidate: true }
		);
	};

	return (
		<Stack>
			<Stack direction="row" gap={2}>
				<TextField
					label="Username or email"
					variant="outlined"
					fullWidth
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							addInvite();
						}
					}}
				/>
				<Button onClick={addInvite} variant="contained" aria-label="add email">
					Add
				</Button>
			</Stack>

			<ul>
				{invites?.map((invite) => (
					<li key={invite.value}>
						{invite.value} ({invite.type})
						<DeleteOutlineIcon onClick={() => removeInvite(invite.value)} />
					</li>
				))}
			</ul>
		</Stack>
	);
}
