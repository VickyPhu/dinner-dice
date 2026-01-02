"use client";

import { createGroupData } from "@/schemas/createGroupSchema";
import { Control, Controller, FieldErrors } from "react-hook-form";
import TextInput from "../textInput";

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
				<TextInput
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
