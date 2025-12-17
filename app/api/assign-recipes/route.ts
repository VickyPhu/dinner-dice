import { assignRecipes } from "@/utils/assignRecipes";

export async function GET() {
	await assignRecipes();
	return Response.json({ ok: true });
}
