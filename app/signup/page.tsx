"use client";

import { Container } from "@mui/material";
import { signUp } from "../auth/actions";

export default function SignupPage() {
	return (
		<Container>
			<form action={signUp} className="signup-form">
				<input name="email" type="email" placeholder="Email" required />
				<input
					name="password"
					type="password"
					placeholder="Password"
					required
				/>
				<button type="submit">Sign up</button>
			</form>
		</Container>
	);
}
