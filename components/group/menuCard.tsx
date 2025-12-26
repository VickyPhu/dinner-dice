"use client";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Link, Stack } from "@mui/material";
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
				justifyContent="space-between"
				sx={{
					textDecoration: "none",
					background: "var(--card-bg)",
					color: "var(--text)",
					padding: "1rem",
					borderRadius: "var(--card-radius)",
					boxShadow: "1px 2px 4px var(--card-shadow)",
					transition: "all 0.2s ease-in-out",
					cursor: "pointer",
					"&:hover": {
						background: "var(--card-hover)",
						boxShadow: "2px 6px 4px var(--card-hover-shadow)",
						"&:hover svg": {
							transform: "translateX(2px)",
						},
					},
				}}
			>
				{/* Content to the left */}
				{children}
				{/* Arrow to the right */}
				<ArrowForwardIosIcon sx={{marginLeft:{xs: 0, md: 1}}} />
			</Stack>
		</Box>
	);
}
