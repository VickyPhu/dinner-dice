"use client";

import { logIn } from "@/app/auth/actions";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import PrimaryButton from "../buttons/primaryButton";
import SecondaryButton from "../buttons/secondaryButton";

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
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: "0.5rem",
				}}
			>
				<TextField
					name="email"
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					error={!!state.error?.email}
					helperText={state.error?.email?.[0]}
					sx={{
						background: "var(--placeholder-bg)",
						borderRadius: "var(--card-radius)",
						"& .MuiInputBase-input": {
							color: "var(--text)",
						},
						"& .MuiOutlinedInput-notchedOutline": {
							borderColor: "var(--button-hover)",
						},
						"&:hover .MuiOutlinedInput-notchedOutline": {
							borderColor: "var(--text)",
						},
						"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
							{
								borderColor: "var(--button-hover)",
							},
					}}
				/>
				<TextField
					name="password"
					type="password"
					placeholder="Password"
					error={!!state.error?.password}
					helperText={state.error?.password?.[0]}
					sx={{
						background: "var(--placeholder-bg)",
						borderRadius: "var(--card-radius)",
						"& .MuiInputBase-input": {
							color: "var(--text)",
						},
						"& .MuiOutlinedInput-notchedOutline": {
							borderColor: "var(--button-hover)",
						},
						"&:hover .MuiOutlinedInput-notchedOutline": {
							borderColor: "var(--text)",
						},
						"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
							{
								borderColor: "var(--button-hover)",
							},
					}}
				/>
				{state.error?.form && (
					<Typography color="error">{state.error.form}</Typography>
				)}
				<Box display={"flex"} flexDirection={"column"} gap={2} paddingTop={1}>
					<PrimaryButton
						variant="contained"
						type="submit"
						sx={{ background: "var(--button)" }}
					>
						Log in
					</PrimaryButton>
					<SecondaryButton onClick={() => router.push("/signup")}>
						Sign up
					</SecondaryButton>
				</Box>
			</Box>
		</Container>
	);
}
