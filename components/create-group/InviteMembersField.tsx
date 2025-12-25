"use client";

import { searchUsers } from "@/utils/searchUsers";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Autocomplete, Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import PrimaryButton from "../buttons/primaryButton";
import TextInput from "../textInput";

type Invite = {
	type: "email" | "username";
	value: string;
};

export default function InviteMembersField() {
	const { setValue, watch } = useFormContext();
	const invites = (watch("invites") ?? []) as Invite[];

	const [inputValue, setInputValue] = useState("");
	const [options, setOptions] = useState<string[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const addInvite = () => {
		const value = inputValue.trim().toLowerCase();
		if (!value) return;

		const isEmail = value.includes("@");
		if (!isEmail && !options.includes(value)) {
			setError("User not found");
			return;
		}

		const invite = {
			type: isEmail ? "email" : "username",
			value,
		};

		if (!invites.some((i) => i.value === value)) {
			setValue("invites", [...invites, invite], { shouldValidate: true });
		}
		setInputValue("");
		setOptions([]);
		setError(null);
	};

	return (
		<Stack>
			<Typography variant="body1" color={"var(--text)"} marginBlock={1}>
				Add a member by username
			</Typography>
			<Stack direction="row" gap={2}>
				<Autocomplete
					freeSolo
					loading={loading}
					options={options}
					inputValue={inputValue}
					fullWidth
					onInputChange={async (_, value) => {
						setInputValue(value);
						setError(null);

						if (value.length < 2 || value.includes("@")) {
							setOptions([]);
							return;
						}

						setLoading(true);
						const users = await searchUsers(value.toLowerCase());
						setOptions(users);
						setLoading(false);
					}}
					onChange={(_, value) => {
						if (typeof value === "string") {
							setInputValue(value);
						}
					}}
					noOptionsText="No users found"
					renderInput={(params) => (
						<TextInput
							{...params}
							label="Username or email"
							error={!!error}
							helperText={error}
						/>
					)}
				/>
				<PrimaryButton
					onClick={addInvite}
					variant="contained"
					aria-label="add email"
				>
					Add
				</PrimaryButton>
			</Stack>

			{invites.length > 0 && (
				<Box>
					<Typography variant="subtitle2">Invited</Typography>
					<ul>
						{invites.map((invite) => (
							<li key={invite.value}>
								{invite.value} ({invite.type})
								<DeleteOutlineIcon
									onClick={() =>
										setValue(
											"invites",
											invites.filter((i) => i.value !== invite.value),
											{ shouldValidate: true }
										)
									}
								/>
							</li>
						))}
					</ul>
				</Box>
			)}
		</Stack>
	);
}
