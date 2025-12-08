"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { acceptInvite, validateInvite } from "./actions";

export default function InvitePage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const token = searchParams.get("token");
	const [status, setStatus] = useState("loading");

	useEffect(() => {
		async function handle() {
			const result = await validateInvite(token as string);

			if (!result.valid) {
				setStatus("invalid");
				return;
			}

			if (!result.loggedIn) {
				router.replace(`/login?redirect=/invite?token=${token}`);
				return;
			}

			const accepted = await acceptInvite(token as string);

			if (accepted.success) {
				router.replace(`/groups/${accepted.groupId}`);
			} else {
				setStatus("invalid");
			}
		}
		handle();
	}, [token, router]);

	if (!token) {
		return <p>Missing or invalid invitation</p>;
	}
	if (status === "loading") return <p>Checking invite...</p>;
	if (status === "invalid")
		return (
			<p>Invalid invitation, please use the invite you&apos;ve received</p>
		);

	return null;
}
