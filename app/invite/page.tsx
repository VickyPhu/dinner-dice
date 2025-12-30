import { Suspense } from "react";
import InviteClient from "./inviteClient";

export default function InvitePage() {
	return (
		<Suspense fallback={<p>Loading invitation...</p>}>
			<InviteClient />
		</Suspense>
	);
}
