"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export type UserProfile = {
	user_id: string;
	username: string;
};

export default function useUserProfile() {
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const supabase = createClient();

		async function load() {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) {
				setLoading(false);
				return;
			}

			const { data } = await supabase
				.from("profiles")
				.select("user_id, username")
				.eq("user_id", user.id)
				.single();

			setProfile(data ?? null);
			setLoading(false);
		}

		load();
	}, []);

	return { profile, loading };
}
