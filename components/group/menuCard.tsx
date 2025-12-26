"use client";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Avatar, Box, Link, Stack } from "@mui/material";
import { ReactNode } from "react";

export default function MenuCard({
	children,
	onClick,
}: {
	children: ReactNode;
	onClick?: () => void;
}) {
	return (
		<Box component={Link} onClick={onClick} sx={{ textDecoration: "none" }}>
			<Stack
				direction="row"
				alignItems="center"
				sx={{
					textDecoration: "none",
					background: "var(--card-bg)",
					color: "var(--text)",
					padding: "1rem",
					borderRadius: "var(--card-radius)",
					boxShadow: "1px 2px 4px var(--card-shadow)"
				}}
			>
				{/* Content to the left */}
				{children}
				{/* Arrow to the right */}
				<Avatar>
					<ArrowForwardIosIcon />
				</Avatar>
			</Stack>
		</Box>
	);
}
