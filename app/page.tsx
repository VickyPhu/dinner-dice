"use client";

import { Container } from "@mui/material";
import { logIn } from "../app/auth/actions";

export default function LandingPage() {
	return (
		<Container>
			<form action={logIn} className="login-form">
				<input name="email" type="email" placeholder="Email" required />
				<input
					name="password"
					type="password"
					placeholder="Password"
					required
				/>
				<button type="submit">Log in</button>
			</form>
		</Container>
	);
}
