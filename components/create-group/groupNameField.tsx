"use client";

import { createGroupData } from "@/utils/validation";
import { TextField } from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";

type Props = {
	control: Control<createGroupData>;
	errors: FieldErrors<createGroupData>;
};

export default function GroupNameField({ control, errors }: Props) {
	return (
		<Controller
			name="name"
			control={control}
			render={({ field }) => (
				<TextField
					{...field}
					label="Group name"
					fullWidth
					required
					error={Boolean(errors?.name)}
					helperText={errors?.name?.message}
					placeholder="Enter group name"
				/>
			)}
		/>
	);
}
