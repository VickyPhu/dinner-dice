import z from "zod";

export const signUpSchema = z.object({
	email: z.string().email("Invalid Email address"),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long" })
		.regex(/[A-Z]/, {
			message: "Password must contain at least one uppercase letter",
		})
		.regex(/[a-z]/, {
			message: "Password must contain at least one lowercase letter",
		})
		.regex(/[0-9]/, { message: "Password must contain at least one number" }),
});

export type signInData = z.infer<typeof signUpSchema>;

export const logInSchema = z.object({
	email: z.string().email("Invalid Email adress"),
	password: z.string().min(1, { message: "Password is required" }),
});

export type logInData = z.infer<typeof logInSchema>;

export const createGroupSchema = z
	.object({
		name: z.string().min(3, "Group name must be at least 3 characters long"),
		sharing_frequency: z
			.number()
			.min(1, "Must share at least once per week")
			.max(7, "Max 7 days"),
		weekdays: z.array(z.string()).min(1, "Select at least one day"),
		invited_emails: z.array(z.string().email()).optional(),
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
