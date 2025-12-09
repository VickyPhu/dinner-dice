import { calculateNextSharing, Weekday } from "@/utils/calculateNextSharing";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export function useGroupSubmissions(group: {
	id: string;
	weekdays: Weekday[];
	sharing_frequency: number;
}) {
	const [submittedCount, setSubmittedCount] = useState(0);
	const [requiredCount] = useState(group.sharing_frequency);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function submittedRecipes() {
			const supabase = createClient();
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) return;

			// Calculate future sharings
			const nextSharing = calculateNextSharing(
				group.weekdays,
				group.sharing_frequency
			);

			// Remake to dates
			const today = new Date();
			const dates = nextSharing.map((d) => {
				const date = new Date(today);
				date.setDate(today.getDate() + d);
				return date.toISOString().slice(0, 10);
			});

			// Fetch recipe for the dates
			const { data: submissions, error } = await supabase
				.from("recipes")
				.select("*")
				.eq("group_id", group.id)
				.eq("user_id", user.id)
				.in("for_date", dates);

			if (error) {
				console.error("Submission fetch error", error);
				return;
			}
			setSubmittedCount(submissions.length);
			setLoading(false);
		}
		submittedRecipes();
	}, [group.id, group.weekdays, group.sharing_frequency]);

	return { submittedCount, requiredCount, loading };
}
