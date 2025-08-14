import { prisma } from "@/lib/DB";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import bcrypt from "bcrypt";
const registerSchema = z.object({
  username: z.string().min(3).max(12),
  email: z.email(),
  password: z.string().min(6).max(12),
});

export async function POST(req: NextRequest) {
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

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User already exist, Please Login" },
        { status: 402 }
      );
    }

    const saltvalue = await bcrypt.genSalt(Number(10));
    const hashedPassword = await bcrypt.hash(password, saltvalue);

    const createduser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    if (!createduser) {
      return NextResponse.json(
        { success: false, error: "Oops try again!!" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Registartion Successfull" },
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
