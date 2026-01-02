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
	username: z
		.string()
		.min(3)
		.regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and _"),
});

export type signInData = z.infer<typeof signUpSchema>;

export const logInSchema = z.object({
	email: z.string().email("Invalid Email adress"),
	password: z.string().min(1, { message: "Password is required" }),
});

export type logInData = z.infer<typeof logInSchema>;
