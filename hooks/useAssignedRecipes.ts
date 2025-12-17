import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export interface Recipe {
	id: string;
	title: string;
	time: string;
	ingredients: string[];
	steps: string[];
}

export interface RecipeAssignment {
	id: string;
	group_id: string;
	assigned_to: string;
	recipe_id: string;
	for_date: string;
	reveal_at: string;
	recipe: Recipe;
}

export function useAssignedRecipe(groupId: string) {
	const [assignment, setAssignment] = useState<RecipeAssignment | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function load() {
			const supabase = await createClient();
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) return;

			const { data, error } = await supabase
				.from("recipe_assignments")
				.select(`*, recipes!inner (id, title, time, ingredients, steps)`)
				.eq("group_id", groupId)
				.eq("assigned_to", user.id)
				.maybeSingle();

			if (error) {
				console.error("Assignment fetch error", error);
			} else if (data) {
				setAssignment({
					id: data.id,
					group_id: data.group_id,
					assigned_to: data.assigned_to,
					recipe_id: data.recipe_id,
					for_date: data.for_date,
					reveal_at: data.reveal_at,
					recipe: {
						id: data.recipes.id,
						title: data.recipes.title,
						time: data.recipes.time,
						ingredients: data.recipes.ingredients,
						steps: data.recipes.steps,
					},
				});
			}
			setLoading(false);
		}
		load();
	}, [groupId]);
	return { assignment, loading };
}
