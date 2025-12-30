import Footer from "@/components/footer";
import Toast from "@/components/toast";
import type { Metadata } from "next";
import { Atma, Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers/index";

export const metadata: Metadata = {
	title: "Dinner Dice - Daily Recipes for Your Group",
	description:
		"Plan and share recipes with your group easily using Dinner Dice",
};

const atma = Atma({
	weight: ["400", "500"],
	variable: "--font-heading",
});

const inter = Inter({
	weight: ["400", "500"],
	variable: "--font-body",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${atma.variable} ${inter.variable}`}>
			<body>
				<Providers>
					<main className="page-container">{children}</main>
					<Footer />
					<Toast />
				</Providers>
			</body>
		</html>
	);
}
