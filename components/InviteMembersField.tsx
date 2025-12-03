"use client";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function InviteMembersField() {
	const { setValue, watch } = useFormContext();
	const invited = watch("invited_emails") as string[];

	const [inputValue, setInputValue] = useState("");

	const addEmail = () => {
		const email = inputValue.trim();

		if (!email) return;

		// Only add if the email is not already in the list
		if (!invited.includes(email)) {
			setValue("invited_emails", [...invited, email], { shouldValidate: true });
		}

		setInputValue("");
	};

	const removeEmail = (email: string) => {
		setValue(
			"invited_emails",
			invited.filter((e) => e !== email),
			{ shouldValidate: true }
		);
	};

	return (
		<Stack>
			<Stack direction="row" gap={2}>
				<TextField
					label="Invite members (email)"
					variant="outlined"
					fullWidth
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							addEmail();
						}
					}}
				/>
				<Button onClick={addEmail} variant="contained" aria-label="add email">
					Add
				</Button>
			</Stack>

			<ul>
				{invited?.map((email) => (
					<li key={email}>
						{email}
						<DeleteOutlineIcon onClick={() => removeEmail(email)} />
					</li>
				))}
			</ul>
		</Stack>
	);
}
