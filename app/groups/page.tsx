import RenderGroups from "@/components/group/renderGroups";
import Header from "@/components/header";
import { Container } from "@mui/material";

export default function MyGroupsPage() {
	return (
		<Container>
			<Header variant="root" backHref={"/"} />
			<RenderGroups />
		</Container>
	);
}
