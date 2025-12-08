export function InviteEmail({
	groupName,
	inviteUrl,
}: {
	groupName: string;
	inviteUrl: string;
}) {
	return (
		<div>
			<h1>You've been invited to join {groupName}</h1>
			<p>
				Click the link below to join the group:
				<br />
				<a href={inviteUrl}>{inviteUrl}</a>
			</p>
		</div>
	);
}
