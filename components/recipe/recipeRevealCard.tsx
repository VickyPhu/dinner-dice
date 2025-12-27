import { Recipe } from "@/hooks/useAssignedRecipes";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
	Card,
	CardActions,
	CardContent,
	List,
	ListItem,
	Typography,
} from "@mui/material";

interface RecipeRevealProps {
	recipe: Recipe;
	actions?: React.ReactNode;
}

export default function RecipeRevealCard({
	recipe,
	actions,
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
				<Typography variant="h2" sx={{ color: "var(--text)" }}>
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

				<Typography variant="h2">Ingredients</Typography>
				<List>
					{recipe.ingredients.map((ingredient, i) => (
						<ListItem key={i}>{ingredient}</ListItem>
					))}
				</List>

				<Typography variant="h2">Steps</Typography>
				<List>
					{recipe.steps.map((step, i) => (
						<ListItem key={i}>
							{i + 1}. {step}
						</ListItem>
					))}
				</List>
			</CardContent>
			{actions && <CardActions>{actions}</CardActions>}
		</Card>
	);
}
