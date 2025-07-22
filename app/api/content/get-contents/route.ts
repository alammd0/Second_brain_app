import { getUserId } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserId(req);

    // console.log(userId);

    if (!userId) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },

        {
          status: 401,
        }
        
      );
    }

    const content = await prisma.content.findMany({
      where: {
        userid: userId,
      },
    });

    // console.log(content);

    return NextResponse.json(
      {
        message: "Content fetched successfully",
        data: content,
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
