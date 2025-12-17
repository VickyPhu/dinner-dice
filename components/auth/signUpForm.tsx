"use client";

import { signUp } from "@/app/auth/actions";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

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
		<Box component="form" action={formAction}>
			<TextField
				name="username"
				label="Username"
				autoComplete="username"
				required
				fullWidth
				error={!!state.error?.username}
				helperText={state.error?.username?.[0]}
			/>
			<TextField
				name="email"
				type="email"
				placeholder="Email"
				error={!!state.error?.email}
				helperText={state.error?.email?.[0]}
			/>
			<TextField
				name="password"
				type="password"
				placeholder="Password"
				error={!!state.error?.password}
				helperText={state.error?.password?.[0]}
			/>
			{state.error?.form && (
				<Typography color="error">{state.error.form}</Typography>
			)}
			<Button variant="contained" type="submit">
				Sign up
			</Button>
			<Button variant="contained" onClick={() => router.push("/")}>
				Log in
			</Button>
		</Box>
	);
}
