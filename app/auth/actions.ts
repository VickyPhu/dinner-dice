"use server";

import { createClient } from "@/utils/supabase/server";
import { logInSchema, signUpSchema } from "@/utils/validation";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
	const parsed = signUpSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!parsed.success) {
		return { error: parsed.error.flatten().fieldErrors };
	}

	const supabase = await createClient();
	const { error } = await supabase.auth.signUp(parsed.data);
	if (error) {
		return { error: error.message };
	}
	redirect("/groups");
}

export async function logIn(formData: FormData) {
	const parsed = logInSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!parsed.success) {
		const error = parsed.error.flatten().fieldErrors;
		redirect(`/login?error=${encodeURIComponent(JSON.stringify(error))}`);
	}

	const supabase = await createClient();
	const { error } = await supabase.auth.signInWithPassword(parsed.data);

	if (error) {
		const errorObj = { form: error.message };
		redirect(`/login?error=${encodeURIComponent(JSON.stringify(errorObj))}`);
	}
	redirect("/groups");
}

export async function signOut() {
	const supabase = await createClient();
	await supabase.auth.signOut();
	redirect("/");
}
