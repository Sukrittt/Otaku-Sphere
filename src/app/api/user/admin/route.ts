import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { AddAdminUserPayload } from "@/lib/validators/user";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 403 });
    }

    const body = await req.json();

    const { email } = AddAdminUserPayload.parse(body);

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    if (user.role === "ADMIN") {
      return new Response("User already admin", { status: 409 });
    }

    // all good, update user ✅
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        role: "ADMIN",
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
