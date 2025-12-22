"use client";

import { useToastStore } from "@/stores/toastStore";

import { RecipeFormProp } from "@/app/groups/[groupId]/submit-recipe/actions";
import { submitRecipeProxy } from "@/app/groups/[groupId]/submit-recipe/submitRecipeProxy";
import { updateRecipeProxy } from "@/app/groups/[groupId]/submit-recipe/updateRecipeProxy";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
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

	const router = useRouter();
	const { addToast } = useToastStore();

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

				<SubmitRecipeForm
					key={date} // Create new instance of the submit recipe form for each date
					defaultValues={existingRecipe ?? undefined}
					mode={existingRecipe ? "edit" : "create"}
					onSubmit={async (values) => {
						try {
							if (existingRecipe) {
								await updateRecipeProxy(groupId, date, values);
							} else {
								await submitRecipeProxy(groupId, date, values);
							}

							addToast({
								message: `Recipe for ${date} saved`,
								type: "success",
							});

							router.refresh();
						} catch {
							addToast({
								message: `Failed to save recipe for ${date}`,
								type: "error",
							});
						}
					}}
				/>
			</Box>
		</Box>
	);
}
