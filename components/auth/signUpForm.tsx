"use client";

import { signUp } from "@/app/auth/actions";
import { Box, Container, Divider, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import PrimaryButton from "../buttons/primaryButton";
import SecondaryButton from "../buttons/secondaryButton";
import TextInput from "../textInput";

type SignUpFormState = {
	error: null | {
		email?: string[];
		password?: string[];
		username?: string[];
		form?: string;
	};
};

function signUpActionWrapper(prevState: SignUpFormState, formData: FormData) {
	return signUp(formData).then((result) => {
		if (!result) return prevState;
		const { error } = result as {
			error?: string | Record<string, string[]>;
		};
		if (!error) return prevState;
		if (typeof error === "string") return { error: { form: error } };
		return { error } as SignUpFormState;
	});
}

export default function SignupPage() {
	const initialState: SignUpFormState = { error: null };
	const [state, formAction] = useActionState<SignUpFormState, FormData>(
		signUpActionWrapper,
		initialState
	);

	const router = useRouter();

	return (
		<Container
			sx={{
				width: "350px",
				background: "var(--card-bg)",
				padding: "2rem",
				borderRadius: "var(--card-radius)",
				boxShadow: "2px 4px 4px var(--card-shadow)",
			}}
		>
			<Box
				component="form"
				action={formAction}
				noValidate
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: "0.5rem",
				}}
			>
				<TextInput
					name="username"
					label="Username"
					required
					error={!!state.error?.username}
					helperText={state.error?.username?.[0]}
				/>
				<TextInput
					name="email"
					type="email"
					label="Email"
					error={!!state.error?.email}
					helperText={state.error?.email?.[0]}
				/>
				<TextInput
					name="password"
					type="password"
					label="Password"
					error={!!state.error?.password}
					helperText={state.error?.password?.[0]}
				/>
				{state.error?.form && (
					<Typography color="error">{state.error.form}</Typography>
				)}
				<Box display={"flex"} flexDirection={"column"} gap={2} paddingTop={0.5}>
					<PrimaryButton type="submit">Sign up</PrimaryButton>
					<Divider
						sx={{ backgroundColor: "var(--text)", marginBlock: "0.5rem" }}
					/>
					<Typography variant="body1" textAlign={"center"}>
						Already have an account?
					</Typography>
					<SecondaryButton variant="contained" onClick={() => router.push("/")}>
						Log in
					</SecondaryButton>
				</Box>
			</Box>
		</Container>
	);
}
