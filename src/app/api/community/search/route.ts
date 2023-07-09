import { db } from "@/lib/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q");

  if (typeof q !== "string") {
    return new Response("Invalid Query", { status: 400 });
  }

  let whereClause;

  if (q.length === 0) {
    whereClause = {};
  } else {
    whereClause = {
      name: {
        startsWith: q,
      },
    };
  }

  try {
    const results = await db.community.findMany({
      where: whereClause,
      take: 5,
    });

    return new Response(JSON.stringify(results));
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}
