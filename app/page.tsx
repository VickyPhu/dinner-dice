import { Box, Container, TextField, Typography } from "@mui/material";
import { logIn } from "./auth/actions";

type LoginFormState = {
	error: null | {
		email?: string[];
		password?: string[];
		form?: string;
	};
};

export default function LandingPage({
	searchParams,
}: {
	searchParams?: Record<string, string>;
}) {
	const error = searchParams?.error
		? (JSON.parse(searchParams.error) as LoginFormState["error"])
		: null;

	return (
		<Container>
			<Box component="form" action={logIn}>
				<TextField
					name="email"
					type="email"
					placeholder="Email"
					error={!!error?.email}
					helperText={error?.email?.[0]}
				/>
				<TextField
					name="password"
					type="password"
					placeholder="Password"
					error={!!error?.password}
					helperText={error?.password?.[0]}
				/>
				{error?.form && <Typography color="error">{error.form}</Typography>}
				<button type="submit">Log in</button>
			</Box>
		</Container>
	);
}
