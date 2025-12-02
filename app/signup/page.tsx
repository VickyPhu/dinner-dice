"use client";

import { Box, Container, TextField, Typography } from "@mui/material";
import { useActionState } from "react";
import { signUp } from "../auth/actions";

type SignUpFormState = {
	error: null | {
		email?: string[];
		password?: string[];
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

	return (
		<Container>
			<Box component="form" action={formAction}>
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
				<button type="submit">Sign up</button>
			</Box>
		</Container>
	);
}
