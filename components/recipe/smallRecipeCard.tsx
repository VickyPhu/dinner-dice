"use client";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Card, CardContent, Icon, Link, Typography } from "@mui/material";

interface Recipe {
	id: string;
	title: string;
	time: string;
}

export default function SmallRecipeCard({
	recipes,
	groupId,
}: {
	recipes: Recipe[];
	groupId: string;
}) {
	return (
		<Box sx={{ margin: "1rem 1.5rem" }}>
			{recipes.map((recipe) => (
				<Link href={`/groups/${groupId}/recipes/${recipe.id}`} key={recipe.id}>
					<Card>
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
				</Link>
			))}
		</Box>
	);
}
