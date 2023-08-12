import { db } from "@/lib/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q");

  if (!q || typeof q !== "string") {
    return new Response("Invalid Query", { status: 400 });
  }

  try {
    const results = await db.anime.findMany({
      where: {
        name: {
          contains: q,
        },
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        totalRatings: "desc",
      },
      take: 5,
    });

    results.sort((a, b) => a.name.length - b.name.length);

    return new Response(JSON.stringify(results));
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}
