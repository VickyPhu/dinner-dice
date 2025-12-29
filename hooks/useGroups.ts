"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export type GroupData = {
	id: string;
	name: string;
	weekdays: string[];
	sharing_frequency: number;
	created_by: string;
};

export function useGroups() {
	const [groups, setGroups] = useState<GroupData[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchGroups = async () => {
		try {
			setLoading(true);
			const supabase = createClient();
			const { data, error } = await supabase.from("groups").select("*");
			if (error) console.error(error);
			setGroups(data || []);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		(async () => {
			await fetchGroups();
		})();
	}, []);

	return { groups, loading, refetch: fetchGroups };
}
