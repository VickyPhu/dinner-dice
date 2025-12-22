import { Recipe } from "@/hooks/useAssignedRecipes";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
	Card,
	CardActions,
	CardContent,
	Icon,
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
		<Card>
			<CardContent>
				<Typography variant="h2">{recipe.title}</Typography>
				<Typography variant="subtitle1">
					<Icon>
						<AccessTimeIcon />
					</Icon>
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
