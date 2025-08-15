import { prisma } from "@/lib/DB";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const likeschema = z.object({
  blogId: z.string(),
});
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsedBody = likeschema.safeParse(data);

    if (!parsedBody.success) {
      return NextResponse.json(
        { success: false, error: parsedBody.error.format() },
        { status: 400 }
      );
    }

    const { blogId } = parsedBody.data;

    const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

    const existUser = await prisma.user.findFirst({
      where: {
        id: token?.id,
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
        id: blogId,
      },
    });

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "No blog for this id",
        },
        {
          status: 204,
        }
      );
    }

    const isliked = await prisma.like.findFirst({
      where: {
        blogId: blogId,
        userId: existUser.id,
      },
    });

    if (!isliked) {
      await prisma.like.create({
        data: {
          blogId: blogId,
          userId: existUser.id,
        },
      });

      return NextResponse.json(
        {
          success: true,
          message: "Liked",
        },
        {
          status: 200,
        }
      );
    }

    if (isliked) {
      await prisma.like.delete({
        where: {
          id: isliked.id,
        },
      });

      return NextResponse.json(
        {
          success: true,
          message: "Like removed",
        },
        {
          status: 200,
        }
      );
    }
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
