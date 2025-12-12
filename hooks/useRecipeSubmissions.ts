"use client"

import { RecipeFormProp } from "@/app/groups/[groupId]/submit-recipe/actions";
import { calculateNextSharing, Weekday } from "@/utils/calculateNextSharing";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export function useRecipeSubmissions(group: {
	id: string;
	weekdays: Weekday[];
	sharing_frequency: number;
}) {
	const [entries, setEntries] = useState<
		{ date: string; recipe: RecipeFormProp | null }[]
	>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function load() {
			const supabase = createClient();
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (!session || !session.user || !session.user.id) {
				console.warn("No valid user session");
				setLoading(false);
				return;
			}

			const user = session.user;

			const offsets = calculateNextSharing(
				group.weekdays,
				group.sharing_frequency
			);

			const today = new Date();
			const dates = offsets.map((d) => {
				const date = new Date(today);
				date.setDate(today.getDate() + d);
				return date.toISOString().slice(0, 10);
			});

			const { data, error } = await supabase
				.from("recipes")
				.select("*")
				.eq("group_id", group.id)
				.eq("user_id", user.id)
				.in("for_date", dates);

			if (error) {
				console.error("Submission fetch error:", error);
				setLoading(false);
				return;
			}

			const mapped = dates.map((date) => {
				const row = data.find((r) => r.for_date === date);

				return {
					date,
					recipe: row
						? {
								title: row.title,
								time: row.time ?? "",
								ingredients: row.ingredients ?? [],
								steps: row.steps ?? [],
							}
						: null,
				};
			});

			setEntries(mapped);
			setLoading(false);
		}

		load();
	}, [group.id, group.weekdays, group.sharing_frequency]);

	return { entries, loading };
}
