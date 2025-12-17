"use server";

import { createClient } from "@/utils/supabase/server";
import { createGroupSchema } from "@/utils/validation";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { InviteEmail } from "../emails/inviteEmail";

const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;

export async function createGroup(formData: FormData) {
	const parsed = createGroupSchema.safeParse({
		name: formData.get("name"),
		sharing_frequency: Number(formData.get("sharing_frequency")),
		weekdays: formData.getAll("weekdays"),
		invites: JSON.parse(formData.get("invites") as string),
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

	for (const invite of parsed.data.invites) {
		// Invite by email
		if (invite.type === "email") {
			const token = crypto.randomUUID();

			const { error: inviteError } = await supabase
				.from("group_invites")
				.insert({
					group_id: group.id,
					email: invite.value,
					token,
				});

			if (inviteError) {
				console.error("Invite creation failed", inviteError);
				continue;
			}

			// Generate invite URL
			const inviteUrl = `${baseUrl}/invite?token=${token}`;

			// Send invite email
			try {
				await resend.emails.send({
					from: "DinnerDice <onboarding@resend.dev>", // Should be own domain later
					to: invite.value,
					subject: `You're invited to join ${group.name}`,
					react: InviteEmail({ groupName: group.name, inviteUrl }),
				});
			} catch (err) {
				console.error("Email failed:", err);
			}
		}

		// Add member by username (instantly a member)
		if (invite.type === "username") {
			const { data: profile } = await supabase
				.from("profiles")
				.select("user_id")
				.eq("username", invite.value)
				.single();

			if (!profile) {
				console.warn("Username not found", invite.value);
				continue;
			}

			const { error: memberError } = await supabase
				.from("group_members")
				.insert({
					group_id: group.id,
					user_id: profile.user_id.id,
					role: "member",
				});

			if (memberError) {
				console.error("Failed to add member", memberError);
			}
		}

		return { success: true };
	}
}
