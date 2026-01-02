import z from "zod";

export const createGroupSchema = z
	.object({
		name: z.string().min(3, "Group name must be at least 3 characters long"),
		sharing_frequency: z
			.number()
			.min(1, "Must share at least once per week")
			.max(7, "Max 7 days"),
		weekdays: z.array(z.string()).min(1, "Select at least one day"),
		invites: z
			.array(
				z.object({
					type: z.enum(["email", "username"]),
					value: z.string().min(1),
				})
			)
			.min(0, "Invites must be an array"),
	})
	.superRefine((data, ctx) => {
		// amount of days the user selected
		const selectedDays = data.weekdays.length;

		// should match the sharing frequency
		if (selectedDays !== data.sharing_frequency) {
			ctx.addIssue({
				path: ["weekdays"],
				code: z.ZodIssueCode.custom,
				message: `You selected ${selectedDays} day(s), but sharing frequency is ${data.sharing_frequency}.`,
			});
		}
	});
export type createGroupData = z.infer<typeof createGroupSchema>;
