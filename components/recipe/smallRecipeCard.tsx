"use client";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Card, CardContent, Link, Typography } from "@mui/material";

interface Recipe {
	id: string;
	title: string;
	time: string;
	username: string;
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
			<Typography variant="h1" sx={{ mb: 2 }}>
				All recipes
			</Typography>
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: {
						xs: "1fr",
						md: "repeat(auto-fit, minmax(300px, 1fr))",
					},
					gap: 2,
				}}
			>
				{recipes.map((recipe) => (
					<Link
						href={`/groups/${groupId}/recipes/${recipe.id}`}
						key={recipe.id}
						sx={{ textDecoration: "none", flex: 1 }}
					>
						<Card
							sx={{
								height: "100%",
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
							<CardContent
								sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
							>
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
								<Typography variant="body2">By: {recipe.username}</Typography>
							</CardContent>
						</Card>
					</Link>
				))}
			</Box>
		</Box>
	);
}
