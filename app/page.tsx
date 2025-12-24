import LogInForm from "@/components/auth/logInForm";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function LandingPage() {
	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: { xs: "column", md: "row" },
				alignItems: "center",
				justifyContent: "center",
				gap: { xs: 4, md: 8 },
			}}
		>
			<Box
				component="header"
				role="banner"
				sx={{
					textAlign: { xs: "center", md: "left" },
					display: "flex",
					flexDirection: "column",
					alignItems: { xs: "center", md: "flex-start" },
				}}
			>
				<Box component="h1" sx={{ width: { xs: 200, sm: 240, md: 320 } }}>
					<span className="hidden">Dinner Dice</span>
					<Image
						src="/dinnerdice_logo.png"
						alt="Dinner dice logo"
						width={320}
						height={120}
						style={{ width: "100%", height: "auto" }}
					/>
				</Box>
				<Typography
					component="h2"
					variant="body1"
					sx={{
						fontSize: { xs: "1.4rem", md: "2rem" },
						fontWeight: "bold",
						color: "var(--button-hover)",
						mt: 2,
					}}
				>
					Share recipes. Get surprises.
				</Typography>
			</Box>
			<LogInForm />
		</Box>
	);
}
