"use client";

import { createGroup } from "@/app/groups/actions";
import { createGroupData, createGroupSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import InviteMembersField from "../create-group/InviteMembersField";
import FrequencySelect from "./frequencySelect";
import WeekdayPicker from "./weekdayPicker";

type Props = {
	open: boolean;
	onClose: () => void;
};

export default function CreateGroupModal({ open, onClose }: Props) {
	const methods = useForm<createGroupData>({
		resolver: zodResolver(createGroupSchema),
		defaultValues: {
			name: "",
			sharing_frequency: 1,
			weekdays: [],
			invited_emails: [],
		},
	});

	const onSubmit = async (data: createGroupData) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("sharing_frequency", String(data.sharing_frequency));
		data.weekdays.forEach((d) => formData.append("weekdays", d));
		formData.append("invited_emails", (data.invited_emails ?? []).join(","));

		await createGroup(formData);
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
			<DialogTitle>Create group</DialogTitle>

			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<DialogContent>
						{/* Add components to the form here */}

						{/* Dropdown to chose sharing frequency */}
						<FrequencySelect />

						{/* Which days will the group share recipes, based on selected frequency */}
						<WeekdayPicker />

						{/* Textfield to add members */}
						<InviteMembersField />
					</DialogContent>

					<DialogActions>
						<Button onClick={onClose}>Cancel</Button>
						<Button type="submit" variant="contained">
							Create
						</Button>
					</DialogActions>
				</form>
			</FormProvider>
		</Dialog>
	);
}
