import { Container, Typography } from "@mui/material";
import { signOut } from "../auth/actions";

export default function MyGroupsPage() {
	return (
		<Container>
			<Typography variant="h1">Welcome User</Typography>
			<form action={signOut}>
				<button type="submit">Sign out</button>
			</form>
		</Container>
	);
}
