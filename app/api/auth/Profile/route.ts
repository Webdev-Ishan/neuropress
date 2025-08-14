import { prisma } from "@/lib/DB";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Login Please" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: token.id },
      include: {
        blogs: {
          select: {
            title: true,
            content: true,
            likes: true,
          },
        },
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: "User does not exist, Please Register" },
        { status: 402 }
      );
    }

    return NextResponse.json(
      { success: true, existingUser },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
