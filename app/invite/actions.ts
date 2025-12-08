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

export async function acceptInvite(token: string) {
	const supabase = await createClient();

	const { data: session } = await supabase.auth.getUser();

	if (!session?.user) {
		return { needLogin: true };
	}

	const userId = session.user.id;

	// Fetch invite
	const { data: invite } = await supabase
		.from("group_invites")
		.select("*")
		.eq("token", token)
		.single();

	if (!invite || invite.accepted) {
		return { error: "Invalid invite" };
	}

	// Add user to the group
	await supabase.from("group_members").insert({
		group_id: invite.group_id,
		user_id: userId,
		role: "member",
	});

	// Mark invite as accepted
	await supabase
		.from("group_invites")
		.update({
			accepted: true,
			accepted_by: userId,
		})
		.eq("token", token);

	return { success: true, groupId: invite.group_id };
}
