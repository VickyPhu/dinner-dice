import { NextRequest, NextResponse } from "next/server";

// For all the routes (route: groups) that needs protection
export const config = {
	matcher: ["/groups/:path*"],
};

export async function proxy(req: NextRequest) {
	const url = req.nextUrl.clone();

	const token = req.cookies.get("sb-access-token")?.value;
	const userId = req.cookies.get("sb-user-id")?.value;

	// User gets redirected to landing page / login if they are not logged in
	if (!token || !userId) {
		url.pathname = "/";
		return NextResponse.redirect(url);
	}
	return NextResponse.next();
}
