import { Box, Typography } from "@mui/material";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<Box component="footer">
			<Typography
				variant="body2"
				sx={{
					py: 2,
					textAlign: "center",
					borderTop: "1px solid var(--button2-shadow)",
					mt: "auto",
				}}
			>
				&copy; {currentYear} Dinner Dice. All right reserved.
			</Typography>
		</Box>
	);
}
