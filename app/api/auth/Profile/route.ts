import { prisma } from "@/lib/DB";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import bcrypt from "bcrypt";

const registerSchema = z.object({
  username: z.string().min(3).max(12),
  email: z.email(),
  password: z.string().min(6).max(12),
});

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
            id: true,
            thumbnail:true,
            title: true,
            content: true,
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

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const parsedBody = registerSchema.safeParse(data);

    if (!parsedBody.success) {
      return NextResponse.json(
        { success: false, error: parsedBody.error.format() },
        { status: 400 }
      );
    }

    const { username, email, password } = parsedBody.data;

    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: "User does not exist" },
        { status: 402 }
      );
    }

    const decodepassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    const saltvalue = await bcrypt.genSalt(Number(10));
    const hashedPassword = await bcrypt.hash(password, saltvalue);

    if (
      existingUser.username !== username ||
      existingUser.email !== email ||
      !decodepassword
    ) {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });
    }

    return NextResponse.json(
      { success: true, message: "Updation Successfull" },
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
