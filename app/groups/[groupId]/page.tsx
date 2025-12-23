import GroupDashboard from "@/components/group/groupDashboard";
import Header from "@/components/header";
import { Box } from "@mui/material";

export default function DashboardPage() {
	return (
		<Box>
			<Header variant="back" backHref={"/groups"} />
			<GroupDashboard />
		</Box>
	);
}
