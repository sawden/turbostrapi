import { fetchLocales } from "@/lib/api";

export async function GET(_request: Request) {
  const locales = await fetchLocales();

  return Response.json(locales);
}
