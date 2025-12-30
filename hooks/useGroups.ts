"use client";

import { useGroupStore } from "@/stores/groupStore";
import { Weekday } from "@/utils/calculateNextSharing";
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";

export type GroupData = {
	id: string;
	name: string;
	weekdays: Weekday[];
	sharing_frequency: number;
	created_by: string;
};

export function useGroups() {
	const groups = useGroupStore((state) => state.groups);
	const setGroups = useGroupStore((state) => state.setGroups);
	const [loading, setLoading] = useState(true);

	const fetchGroups = useCallback(async () => {
		try {
			setLoading(true);
			const supabase = createClient();
			const { data, error } = await supabase.from("groups").select("*");

			if (error) {
				console.error(error);
				return;
			}

			setGroups(data || []);
		} finally {
			setLoading(false);
		}
	}, [setGroups]);

	useEffect(() => {
		fetchGroups();
	}, [fetchGroups]);

	return { groups, loading, refetch: fetchGroups };
}
