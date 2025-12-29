import { Box, Typography } from "@mui/material";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<Box component="footer">
			<Typography variant="body1">
				&copy; {currentYear} Dinner Dice. All right reserved.
			</Typography>
		</Box>
	);
}
