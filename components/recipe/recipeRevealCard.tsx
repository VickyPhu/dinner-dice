import { BaseRecipe, Recipe } from "@/hooks/useAssignedRecipes";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
	Box,
	Card,
	CardActions,
	CardContent,
	List,
	ListItem,
	Stack,
	Typography,
	TypographyProps,
} from "@mui/material";

interface RecipeRevealProps {
	recipe: Recipe | BaseRecipe;
	actions?: React.ReactNode;
	showUsername?: boolean;
	titleVariant?: TypographyProps["variant"];
}

export default function RecipeRevealCard({
	recipe,
	actions,
	showUsername,
	titleVariant = "h2",
}: RecipeRevealProps) {
	if (!recipe) return null;

	return (
		<Card
			sx={{
				padding: "0.5rem",
				background: "var(--card-bg)",
				borderRadius: "var(--card-radius)",
				boxShadow: "1px 2px 4px var(--card-shadow)",
			}}
		>
			<CardContent>
				<Stack spacing={1}>
					<Typography
						variant={titleVariant ?? "h2"}
						component={titleVariant === "h1" ? "h1" : "h2"}
						sx={{ color: "var(--text)" }}
					>
						{recipe.title}
					</Typography>
					<Typography
						variant="body1"
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 0.5,
							color: "var(--text)",
						}}
					>
						<AccessTimeIcon sx={{ fontSize: 20 }} />
						{recipe.time}
					</Typography>
					{showUsername && "username" in recipe && recipe.username && (
						<Typography variant="body1" color="var(--text)">
							By: {recipe.username}
						</Typography>
					)}

					<Stack direction={{ xs: "column", md: "row" }} spacing={4}>
						<Box sx={{ flex: 1 }}>
							<Typography variant="h3" component="h2" color={"var(--text)"}>
								Ingredients
							</Typography>
							<List
								disablePadding
								sx={{
									listStyleType: "disc",
									listStylePosition: "inside",
								}}
							>
								{recipe.ingredients.map((ingredient, i) => (
									<ListItem
										key={i}
										sx={{
											display: "list-item",
											color: "var(--text)",
											fontSize: "1.125rem",
										}}
									>
										{ingredient}
									</ListItem>
								))}
							</List>
						</Box>

						<Box sx={{ flex: 2 }}>
							<Typography variant="h3" component="h2" color={"var(--text)"}>
								Steps
							</Typography>
							<List disablePadding>
								{recipe.steps.map((step, i) => (
									<ListItem
										key={i}
										sx={{ color: "var(--text)", fontSize: "1.125rem" }}
									>
										{i + 1}. {step}
									</ListItem>
								))}
							</List>
						</Box>
					</Stack>
				</Stack>
			</CardContent>
			{actions && (
				<CardActions
					sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
				>
					{actions}
				</CardActions>
			)}
		</Card>
	);
}
