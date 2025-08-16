import { prisma } from "@/lib/DB";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
const Blogschema = z.object({
  title: z.string().min(3).max(50),
  content: z.string(),
  thumbnail: z.string().optional(),
  blogId: z.string().optional(),
});
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsedBody = Blogschema.safeParse(data);

    if (!parsedBody.success) {
      return NextResponse.json(
        { success: false, error: parsedBody.error.format() },
        { status: 400 }
      );
    }

    const { title, content, thumbnail } = parsedBody.data;

    const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

    if (!token) {
      return NextResponse.json(
        { success: false, error: "token not found" },
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

    const existBlog = await prisma.blog.findFirst({
      where: {
        title: title,
        content: content,
        thumbnail: thumbnail,
        authorId: existUser.id,
      },
    });

    if (existBlog) {
      return NextResponse.json(
        { success: false, error: "Blog already exists." },
        { status: 409 }
      );
    }

    await prisma.blog.create({
      data: {
        title: title,
        content: content,
        thumbnail:thumbnail,
        authorId: token.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully",
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

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const parsedBody = Blogschema.safeParse(data);

    if (!parsedBody.success) {
      return NextResponse.json(
        { success: false, error: parsedBody.error.format() },
        { status: 400 }
      );
    }

    const { title, content, blogId } = parsedBody.data;

    const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

    if (!token) {
      return NextResponse.json(
        { success: false, error: "token not found" },
        { status: 401 }
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

    const existBlog = await prisma.blog.findFirst({
      where: {
        id: blogId,
      },
    });

    if (!existBlog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 409 }
      );
    }

    await prisma.blog.update({
      where: {
        id: existBlog.id,
      },
      data: {
        title: title,
        content: content,
        authorId: token.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog updated successfully",
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

export async function DELETE(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
    const data = await req.json();
    const blogId = data.blogId;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "token not found" },
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

    const existBlog = await prisma.blog.findFirst({
      where: {
        id: blogId,
      },
    });

    if (!existBlog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 409 }
      );
    }

    await prisma.blog.delete({
      where: {
        id: blogId,
        authorId: existUser.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog deleted successfully",
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

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

    if (!token) {
      return NextResponse.json(
        { success: false, error: "token not found" },
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
        authorId: token.id,
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
