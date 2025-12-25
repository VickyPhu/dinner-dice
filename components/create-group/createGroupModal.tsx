"use client";

import { createGroup } from "@/app/groups/actions";
import { useToastStore } from "@/stores/toastStore";
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
import GroupNameField from "./groupNameField";
import WeekdayPicker from "./weekdayPicker";

type Props = {
	open: boolean;
	onClose: () => void;
};

export default function CreateGroupModal({ open, onClose }: Props) {
	const { addToast } = useToastStore();

	const methods = useForm<createGroupData>({
		resolver: zodResolver(createGroupSchema),
		defaultValues: {
			name: "",
			sharing_frequency: 1,
			weekdays: [],
			invites: [],
		},
	});

	const {
		control,
		formState: { errors },
	} = methods;

	const onSubmit = async (data: createGroupData) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("sharing_frequency", data.sharing_frequency.toString());
		data.weekdays.forEach((d) => formData.append("weekdays", d));

		formData.append("invites", JSON.stringify(data.invites));

		const result = await createGroup(formData);

		if (result?.error) {
			console.error("Error creating group:", result.error);
			return;
		}

		addToast({
			message: `Group "${data.name}" created successfully`,
			type: "success",
		});

		methods.reset();
		onClose();
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth="sm"
			PaperProps={{
				sx: {
					backgroundColor: "var(--card-bg)",
					borderRadius: "var(--card-radius)",
				},
			}}
		>
			<DialogTitle variant="h1" color="var(--text)">
				Create group
			</DialogTitle>

			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<DialogContent>
						{/* Add components to the form here */}
						<GroupNameField control={control} errors={errors} />
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
