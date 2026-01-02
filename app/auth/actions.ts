"use server";

import { logInSchema, signUpSchema } from "@/schemas/authSchema";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
	const parsed = signUpSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
		username: formData.get("username"),
	});

	if (!parsed.success) {
		return { error: parsed.error.flatten().fieldErrors };
	}

	const supabase = await createClient();

	// Create auth user
	const { data, error } = await supabase.auth.signUp({
		email: parsed.data.email,
		password: parsed.data.password,
	});

	if (error || !data.user) {
		return { error: error?.message ?? "Signup failed" };
	}

	// Create profile
	const { error: profileError } = await supabase.from("profiles").insert({
		user_id: data.user.id,
		username: parsed.data.username.toLowerCase(),
	});

	if (profileError?.code === "23505") {
		return {
			error: {
				username: ["Username already taken"],
			},
		};
	}

	// In case user is created but profile fails so user doesn't exist without a profile
	if (profileError) {
		await supabase.auth.admin.deleteUser(data.user.id);
		return { error: profileError.message };
	}

	redirect("/groups");
}

export async function logIn(formData: FormData) {
	const parsed = logInSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!parsed.success) {
		return { error: parsed.error.flatten().fieldErrors };
	}

	const supabase = await createClient();
	const { error } = await supabase.auth.signInWithPassword(parsed.data);

	if (error) {
		return { error: error.message };
	}
	redirect("/groups");
}

export async function signOut() {
	const supabase = await createClient();
	await supabase.auth.signOut();
	redirect("/");
}
