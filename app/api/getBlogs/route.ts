import { prisma } from "@/lib/DB";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
    const data = await req.json();
    const blogId = data.blogId;

    if (!token ) {
      return NextResponse.json(
        { success: false, error: "token  not found" },
        { status: 400 }
      );
    }

     if (!blogId ) {
      return NextResponse.json(
        { success: false, error: " blogID not found" },
        { status: 402 }
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

    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId as string,
      },
      include: {
        author: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "No blog for this id",
        },
        {
          status: 409,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        blog,
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
