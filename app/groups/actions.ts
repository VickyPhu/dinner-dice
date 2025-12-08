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

	// Create invites + send emails
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

		// Generate invite URL
		const inviteUrl = `${baseUrl}/invite?token=${token}`;

		// Send invite email
		await resend.emails.send({
			from: "YourApp <noreply@yourdomain.com>",
			to: email,
			subject: `You're invited to join ${group.name}`,
			react: InviteEmail({
				groupName: group.name,
				inviteUrl,
			}),
		});
	}

	return { success: true };
}
