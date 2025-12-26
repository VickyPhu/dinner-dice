"use client";

import { signOut } from "@/app/auth/actions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

type Props = {
	variant: "root" | "back";
	backHref?: string;
};

export default function Header({ variant, backHref }: Props) {
	return (
		<AppBar
			position="static"
			elevation={0}
			sx={{ backgroundColor: "var(--background)", paddingBlock: "1rem" }}
		>
			<Toolbar>
				{variant === "back" && backHref && (
					<IconButton
						component={Link}
						href={backHref}
						edge="start"
						aria-label="Go back"
						sx={{
							transition: "transform 0.2s ease",
							"&:hover": {
								transform: "scale(1.05)",
							},
						}}
					>
						<ArrowBackIcon
							sx={{ fontSize: { xs: 40, md: 45 }, color: "var(--text)" }}
						/>
					</IconButton>
				)}

				{variant === "root" && (
					<Box sx={{ width: { xs: 120, sm: 150 } }}>
						<Image
							src="/dinnerdice_logo.png"
							alt="Dinner Dice Logo"
							width={120}
							height={32}
							style={{ width: "100%", height: "auto" }}
						/>
					</Box>
				)}

				<Box sx={{ flexGrow: 1 }} />
				<form action={signOut}>
					<IconButton
						aria-label="Log out"
						type="submit"
						sx={{
							transition: "transform 0.2s ease",
							"&:hover": {
								transform: "scale(1.05)",
							},
						}}
					>
						<LogoutIcon
							sx={{ fontSize: { xs: 40, md: 45 }, color: "var(--text)" }}
						/>
					</IconButton>
				</form>
			</Toolbar>
		</AppBar>
	);
}
