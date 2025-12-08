import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Link,
	Text,
} from "@react-email/components";

export function InviteEmail({
	groupName,
	inviteUrl,
}: {
	groupName: string;
	inviteUrl: string;
}) {
	return (
		<Html>
			<Head />
			<Body style={{ backgroundColor: "#ffffff", padding: "20px" }}>
				<Container>
					<Heading>You&apos;ve been invited to join {groupName}</Heading>

					<Text>Click the link below to accept your invitation:</Text>

					<Link href={inviteUrl}>{inviteUrl}</Link>

					<Text>
						If you did not expect this email, you can safely ignore it.
					</Text>
				</Container>
			</Body>
		</Html>
	);
}
