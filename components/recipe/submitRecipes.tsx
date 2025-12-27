"use client";

import { RecipeFormProp } from "@/app/groups/[groupId]/submit-recipe/actions";
import { submitRecipeProxy } from "@/app/groups/[groupId]/submit-recipe/submitRecipeProxy";
import { updateRecipeProxy } from "@/app/groups/[groupId]/submit-recipe/updateRecipeProxy";
import theme from "@/app/theme";
import { useToastStore } from "@/stores/toastStore";
import {
	Box,
	MenuItem,
	Tab,
	Tabs,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TextInput from "../textInput";
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

	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Box sx={{ padding: { xs: "1rem", md: "2rem" }, margin: {xs: "1rem", md: "2rem"}, background: "var(--card-bg)", borderRadius: "var(--card-radius)", boxShadow: "1px 2px 4px var(--card-shadow)" }}>
			{isMobile ? (
				<TextInput
					select
					value={selected}
					onChange={(e) => setSelected(Number(e.target.value))}
					fullWidth
					sx={{ mb: 1 }}
				>
					{dates.map((d, idx) => (
						<MenuItem key={d} value={idx}>
							{new Date(d).toLocaleDateString("en-US", {
								weekday: "short",
							})}
							{recipeMap[d] && " ✓"}
						</MenuItem>
					))}
				</TextInput>
			) : (
				<Tabs
					value={selected}
					onChange={(_, v) => setSelected(v)}
					variant="scrollable"
					scrollButtons="auto"
					sx={{
						"& .MuiTab-root": {
							color: "color-mix(in srgb, var(--text) 60%, transparent)",
						},
						"& .MuiTab-root.Mui-selected": {
							color: "var(--text)",
							fontWeight: 600,
						},
						"& .MuiTabs-indicator": {
							backgroundColor: "var(--text)",
						},
					}}
				>
					{dates.map((d, idx) => {
						const weekday = new Date(d).toLocaleDateString("en-US", {
							weekday: "short",
						});

						const done = recipeMap[d] !== null;

						return (
							<Tab
								key={d}
								value={idx}
								label={done ? `✓ ${weekday}` : weekday}
							/>
						);
					})}
				</Tabs>
			)}

			<Box sx={{ mt: 3 }}>
				<Typography variant="h5">Recipe for {date}</Typography>

				<SubmitRecipeForm
					key={date}
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
