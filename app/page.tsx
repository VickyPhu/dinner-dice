"use client";

import { Box, Container, TextField, Typography } from "@mui/material";
import { useActionState, useState } from "react";
import { logIn } from "../app/auth/actions";

type LoginFormState = {
	error: null | {
		email?: string[];
		password?: string[];
		form?: string;
	};
};

function loginActionWrapper(prevState: LoginFormState, formData: FormData) {
	return logIn(formData).then((result) => {
		if (!result) return prevState;
		const { error } = result as {
			error?: string | Record<string, string[]>;
		};
		if (!error) return prevState;
		if (typeof error === "string") return { error: { form: error } };
		return { error } as LoginFormState;
	});
}

export default function LandingPage() {
	const initialState: LoginFormState = { error: null };

	// server action helper (the form action) - keeps server-side validation working
	const [state, formAction] = useActionState<LoginFormState, FormData>(
		loginActionWrapper,
		initialState
	);

	const [email, setEmail] = useState("");

	return (
		<Container>
			<Box component="form" action={formAction}>
				<TextField
					name="email"
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
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
				<button type="submit">Log in</button>
			</Box>
		</Container>
	);
}
