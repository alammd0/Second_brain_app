import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = loginSchema.safeParse(body);

    if (!data.success) {
      return NextResponse.json(
        {
          message: data.error.message,
        },
        {
          status: 411,
        }
      );
    }

    const { email, password } = data.data;

    // check user exiting or not using email
    const existingEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingEmail) {
      return NextResponse.json(
        {
          message: "User not found, Please check your email or Signup",
        },
        {
          status: 403,
        }
      );
    }

    // check password
    const checkPassword = await bcrypt.compare(
      password,
      existingEmail.password
    );

    if (!checkPassword) {
      return NextResponse.json(
        {
          message: "Invalid password",
        },
        {
          status: 403,
        }
      );
    }

    // generate token
    const payLoad = {
      id: existingEmail.id,
      name: existingEmail.name,
      username: existingEmail.username,
    };

    const token = jwt.sign(payLoad, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    (await cookies()).set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
    });

    return NextResponse.json(
      {
        message: "Login successfully",
        data: {
          token: token,
          user: payLoad,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Something went wrong, Server error",
      },
      {
        status: 500,
      }
    );
  }
}
