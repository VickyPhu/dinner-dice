"use client";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Card, CardContent, Icon, Typography } from "@mui/material";

interface Recipe {
	id: string;
	title: string;
	time: string;
}

export default function SmallRecipeCard({ recipes }: { recipes: Recipe[] }) {
	return (
		<Box>
			{recipes.map((recipe) => (
				<Card key={recipe.id}>
					<CardContent>
						<Typography variant="h2">{recipe.title}</Typography>
						<Typography variant="h3">
							<Icon>
								<AccessTimeIcon />
							</Icon>
							{recipe.time}
						</Typography>
					</CardContent>
				</Card>
			))}
		</Box>
	);
}
