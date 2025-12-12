"use client";

import { RecipeFormProp } from "@/app/groups/[groupId]/submit-recipe/actions";
import { submitRecipeProxy } from "@/app/groups/[groupId]/submit-recipe/submitRecipeProxy";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import SubmitRecipeForm from "./submitRecipeForm";

interface SubmitRecipeClientProps {
	groupId: string;
	dates: string[];
	recipeMap: Record<string, RecipeFormProp | null>;
}

export default function SubmitRecipeClient({
	groupId,
	dates,
	recipeMap,
}: SubmitRecipeClientProps) {
	const [selected, setSelected] = useState(0);

	const date = dates[selected];
	const existingRecipe = recipeMap[date];

	return (
		<Box>
			<Tabs
				value={selected}
				onChange={(_, v) => setSelected(v)}
				variant="scrollable"
				scrollButtons="auto"
			>
				{dates.map((d, idx) => {
					const weekday = new Date(d).toLocaleDateString("en-US", {
						weekday: "short",
					});

					const done = recipeMap[d] !== null;

					return (
						<Tab key={d} value={idx} label={done ? `✓ ${weekday}` : weekday} />
					);
				})}
			</Tabs>

			<Box sx={{ mt: 3 }}>
				<Typography variant="h5">Recipe for {date}</Typography>

				{existingRecipe ? (
					<Typography color="success.main" sx={{ mt: 2 }}>
						You already submitted a recipe for this date!
					</Typography>
				) : (
					<SubmitRecipeForm
						onSubmit={async (values) => {
							await submitRecipeProxy(groupId, date, values);
						}}
					/>
				)}
			</Box>
		</Box>
	);
}
