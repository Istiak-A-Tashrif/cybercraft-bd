import prisma from "@/lib/prisma"; // Your Prisma client
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User with this email already exists" }),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error: any) {
    console.error("Error creating user:", error);

    let errorMessage = "An unexpected error occurred";
    if (error.code === "P2002") {
      errorMessage = "User with this email already exists"; // Prisma unique constraint error
    }

    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 400 }
    );
  }
};
