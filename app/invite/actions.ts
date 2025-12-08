"use server";

import { createClient } from "@/utils/supabase/server";

export async function validateInvite(token: string) {
	const supabase = await createClient();

	const { data: session } = await supabase.auth.getUser();

	const { data: invite } = await supabase
		.from("group_invites")
		.select("id, accepted")
		.eq("token", token)
		.single();

	return {
		valid: !!invite && !invite.accepted,
		loggedIn: !!session?.user,
	};
}

