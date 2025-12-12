"use client";

import SubmitRecipeForm from "@/components/recipe/submitRecipeForm";
import { useGroups } from "@/hooks/useGroups";
import { useRecipeSubmissions } from "@/hooks/useRecipeSubmissions";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useState } from "react";
import { RecipeFormProp, submitRecipe } from "./actions";

export default function SubmitRecipePage() {
	const params = useParams();
	const groupId = params.groupId as string;

	// Hooks
	const { groups, loading: loadingGroups } = useGroups();
	const group = groups.find((g) => g.id === groupId);

	// If the group exists, fetch the submission
	const { entries, loading: loadingEntries } = useRecipeSubmissions(
		group ?? { id: "", weekdays: [], sharing_frequency: 0 } // temp fallback
	);

	const [tabIndex, setTabIndex] = useState(0);

	if (loadingGroups) {
		return (
			<Container>
				<Typography>Loading group...</Typography>
			</Container>
		);
	}

	if (!group) {
		return (
			<Container>
				<Typography>Group not found</Typography>
			</Container>
		);
	}

	if (loadingEntries) {
		return (
			<Container>
				<Typography>Loading recipes...</Typography>
			</Container>
		);
	}

	// Render the form
	const currentEntry = entries[tabIndex];

	async function handleSubmit(values: RecipeFormProp) {
		await submitRecipe(groupId, currentEntry.date, values);
	}

	return (
		<Container>
			<Box>
				<Typography variant="h1">Submit this week&apos;s recipe</Typography>

				<Tabs
					value={tabIndex}
					onChange={(_, v) => setTabIndex(v)}
					variant="scrollable"
					scrollButtons="auto"
				>
					{entries.map((entry) => {
						const weekday = new Date(entry.date).toLocaleDateString("en-US", {
							weekday: "short",
						});
						const isDone = !!entry.recipe;
						return (
							<Tab key={entry.date} label={isDone ? `✓ ${weekday}` : weekday} />
						);
					})}
				</Tabs>

				<Box>
					<SubmitRecipeForm onSubmit={handleSubmit} />
				</Box>
			</Box>
		</Container>
	);
}
