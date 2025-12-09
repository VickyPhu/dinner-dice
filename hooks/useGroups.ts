import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export type Group = {
	id: string;
	name: string;
};

type GroupMemberWithGroup = {
	groups: {
		id: string;
		name: string;
	}[];
};

export function useGroups() {
	const [groups, setGroups] = useState<Group[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchGroups() {
			const supabase = createClient();
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) {
				setGroups([]);
				setLoading(false);
				return;
			}

			const { data, error } = await supabase
				.from("group_members")
				.select("groups(id, name)")
				.eq("user_id", user.id);

			if (error || !data) {
				console.error("Supabase error:", error);
				setGroups([]);
				setLoading(false);
				return;
			}

			const groupList = (data as GroupMemberWithGroup[]).flatMap(
				(item) => item.groups
			);

			setGroups(groupList);
			setLoading(false);
		}

		fetchGroups();
	}, []);

	return { groups, loading };
}
