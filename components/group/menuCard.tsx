"use client";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Avatar, Paper, Stack } from "@mui/material";
import { ReactNode } from "react";

export default function MenuCard({
	children,
	onClick,
}: {
	children: ReactNode;
	onClick?: () => void;
}) {
	return (
		<Paper variant="outlined" onClick={onClick}>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				{/* Content to the left */}
				{children}
				{/* Arrow to the right */}
				<Avatar>
					<ArrowForwardIosIcon />
				</Avatar>
			</Stack>
		</Paper>
	);
}
