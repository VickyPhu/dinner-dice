"use client";

import MenuCard from "@/components/group/menuCard";
import { Container, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";

export default function GroupPage() {
	const params = useParams();
	const router = useRouter();
	const groupId = params.groupId;

	return (
		<Container>
			<Typography variant="h1">Group: {groupId}</Typography>
			<MenuCard onClick={() => router.push(`/groups/${groupId}/submit-recipe`)}>
				<Typography variant="h2">Submit this week&apos;s recipe</Typography>
			</MenuCard>
			<MenuCard
				onClick={() => router.push(`/groups/${groupId}/assigned-recipe`)}
			>
				<Typography variant="h2">See assigned recipe</Typography>
			</MenuCard>
			<MenuCard onClick={() => router.push(`/groups/${groupId}/recipes`)}>
				<Typography variant="h2">All recipes</Typography>
			</MenuCard>
		</Container>
	);
}
