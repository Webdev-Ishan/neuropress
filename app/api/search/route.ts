import { prisma } from "@/lib/DB";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
    const data = await req.json();
    const query = data.query;
    if (!token || !query) {
      return NextResponse.json(
        { success: false, error: "token or query not found" },
        { status: 400 }
      );
    }

    const existUser = await prisma.user.findFirst({
      where: {
        id: token.id,
      },
    });

    if (!existUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const blogs = await prisma.blog.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    return NextResponse.json(
      {
        success: true,
        blogs,
      },
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
