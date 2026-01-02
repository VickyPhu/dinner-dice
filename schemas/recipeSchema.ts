import { timeOptions } from "@/constants/timeoptions";
import z from "zod";

export const recipeSchema = z.object({
	title: z.string().min(3, "Recipe title is required"),
	time: z.enum(timeOptions, {
		message: "Please select a cooking time",
	}),
	ingredients: z
		.array(z.string().min(1))
		.min(1, "At least one ingredient is required"),
	steps: z.array(z.string().min(1)).min(1, "At least one step is required"),
});

export type RecipeFormData = z.infer<typeof recipeSchema>;
