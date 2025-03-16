import prisma from "@/lib/prisma";
import { res } from "@/lib/utils";

// GET
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const queryParams = url.searchParams;
    const user_email = queryParams.get("user_email");

    if (!user_email) {
      return res.error("Email Not found", 400);
    }

    const user = await prisma.user.findFirst({
      where: { email: user_email },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      return res.error("User Not valid", 400);
    }

    return res.success({
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.error(error?.message || "Failed to fetch question");
  }
}
