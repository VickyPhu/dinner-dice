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

export function useAssignedRecipes(groupId: string) {
	const [assignments, setAssignments] = useState<RecipeAssignment[]>([]);
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
				.select(`*, recipes(id, title, time, ingredients, steps)`)
				.eq("group_id", groupId)
				.eq("assigned_to", user.id)
				.order("for_date", { ascending: true });

			if (error) {
				console.error("Assignment fetch error", error);
				setLoading(false);
				return;
			}

			if (!data) {
				setAssignments([]);
				setLoading(false);
				return;
			}

			const today = new Date();
			today.setHours(0, 0, 0, 0);

			const mapped: RecipeAssignment[] = data
				.filter((item) => item.recipes)
				.map((item) => ({
					id: item.id,
					group_id: item.group_id,
					assigned_to: item.assigned_to,
					recipe_id: item.recipe_id,
					for_date: item.for_date,
					reveal_at: item.reveal_at,
					recipe: {
						id: item.recipes.id,
						title: item.recipes.title,
						time: item.recipes.time,
						ingredients: item.recipes.ingredients,
						steps: item.recipes.steps,
					},
				}))
				.filter(isVisibleToday);

			setAssignments(mapped);
			setLoading(false);
		}

		load();
	}, [groupId]);

	return { assignments, loading };
}

function isVisibleToday(a: RecipeAssignment) {
	const today = new Date().toISOString().slice(0, 10);
	return a.reveal_at.slice(0, 10) <= today && today <= a.for_date;
}
