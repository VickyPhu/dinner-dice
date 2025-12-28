"use client";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Card, CardContent, Link, Typography } from "@mui/material";

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
				<Link
					href={`/groups/${groupId}/recipes/${recipe.id}`}
					key={recipe.id}
					sx={{ textDecoration: "none" }}
				>
					<Card
						sx={{
							color: "var(--text)",
							background: "var(--card-bg)",
							boxShadow: "1px 2px 4px var(--card-shadow)",
							transition: "all 0.2s ease-in-out",
							cursor: "pointer",
							"&:hover": {
								background: "var(--card-hover)",
								boxShadow: "2px 6px 4px var(--card-hover-shadow)",
								"&:hover .arrow": {
									transform: "translateX(2px)",
								},
							},
						}}
					>
						<CardContent>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									gap: 2,
								}}
							>
								<Typography variant="h2">{recipe.title}</Typography>
								<ArrowForwardIosIcon
									className="arrow"
									sx={{ fontSize: 20, transition: "transform 0.2s ease" }}
								/>
							</Box>
							<Typography
								variant="body1"
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 0.5,
								}}
							>
								<AccessTimeIcon sx={{ fontSize: 20 }} />
								{recipe.time}
							</Typography>
						</CardContent>
					</Card>
				</Link>
			))}
		</Box>
	);
}
