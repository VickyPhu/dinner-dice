import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export type GroupMember = {
	user_id: string;
	username?: string;
};

export function useGroupMember(groupId?: string) {
	const [members, setMembers] = useState<GroupMember[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchMembers() {
			const supabase = createClient();

			if (!groupId) {
				setMembers([]);
				setLoading(false);
				return;
			}

			// Get user_ids from group_members tabell
			const { data: groupData, error: groupError } = await supabase
				.from("group_members")
				.select("user_id")
				.eq("group_id", groupId);

			if (groupError || !groupData) {
				console.error(groupError);
				setMembers([]);
				setLoading(false);
				return;
			}

			const userIds = groupData
				.map((m) => m.user_id)
				.filter((id): id is string => !!id);

			if (userIds.length === 0) {
				setMembers([]);
				setLoading(false);
				return;
			}

			// Get username from profiles tabell
			const { data: profileData, error: profileError } = await supabase
				.from("profiles")
				.select("user_id, username")
				.in("user_id", userIds); 

			if (profileError) console.error("Profile fetch error:", profileError);

			if (profileError || !profileData) {
				console.error(profileError);
				setMembers([]);
				setLoading(false);
				return;
			}

			const membersWithUsernames = userIds.map((id) => ({
				user_id: id,
				username: profileData.find((p) => p.user_id === id)?.username,
			}));

			setMembers(membersWithUsernames);
			setLoading(false);
		}

		fetchMembers();
	}, [groupId]);

	return { members, loading };
}
