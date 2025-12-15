import { createClient } from "@/utils/supabase/server"; // din SSR-client
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// For all routes under /groups
export const config = {
	matcher: ["/groups/:path*"],
};

export default async function proxy(req: NextRequest) {
	const url = req.nextUrl.clone();

	const supabase = await createClient();

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError || !user) {
		url.pathname = "/";
		return NextResponse.redirect(url);
	}

	// Get group id from url
	const pathParts = req.nextUrl.pathname.split("/");
	const groupId = pathParts[2];

	if (groupId) {
		// Check if user is a member in the group
		const { data: membership, error: membershipError } = await supabase
			.from("group_members")
			.select("*")
			.eq("group_id", groupId)
			.eq("user_id", user.id)
			.single();

		if (membershipError || !membership) {
			url.pathname = "/404";
			return NextResponse.redirect(url);
		}
	}

	return NextResponse.next();
}
