"use server";

import { createClient } from "@/utils/supabase/server";
import { createGroupSchema } from "@/utils/validation";
import { redirect } from "next/navigation";

export async function createGroup(formData: FormData) {
	const parsed = createGroupSchema.safeParse({
		name: formData.get("name"),
		sharing_frequency: Number(formData.get("sharing_frequency")),
		weekdays: formData.getAll("weekdays"),
		invited_emails: formData.get("invited_emails")
			? (formData.get("invited_emails") as string)
					.split(",")
					.map((e) => e.trim())
			: [],
	});

	if (!parsed.success) {
		return { error: parsed.error.flatten().fieldErrors };
	}

	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) redirect("/");

	const { data: group, error: insertError } = await supabase
		.from("groups")
		.insert({
			...parsed.data,
			created_by: user.id,
		})
		.select()
		.single();

	if (insertError) return { error: insertError.message };

	// Add the creator as the admin of the group
	const { error: memberError } = await supabase.from("group_members").insert({
		group_id: group.id,
		user_id: user.id,
		role: "admin",
	});

	if (memberError) return { error: memberError.message };

	// Create invites for each invited email
	for (const email of parsed.data.invited_emails ?? []) {
		const token = crypto.randomUUID();

		const { error: inviteError } = await supabase.from("group_invites").insert({
			group_id: group.id,
			email,
			token,
		});

		if (inviteError) {
			console.error("Invite creation failed", inviteError);
		}
	}

	return { success: true };
}
