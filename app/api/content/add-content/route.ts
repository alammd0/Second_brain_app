import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { createContentSchema } from "@/lib/zod";
import { getUserId } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();
    const userId = await getUserId(req);

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

    const data = createContentSchema.safeParse(body);

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

    const { title, description, tags, url, contentType } = data.data;

    // find user
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 400,
        }
      );
    }

    // Now Create Content
    const newContent = await prisma.content.create({
      data: {
        title: title,
        description: description,
        url: url,
        contentType: contentType,
        userid: userId,
      },
    });

    if (tags.length > 0) {
      const tagsData = tags.map((tag) => ({
        name: tag,
        contentId: newContent.id,
      }));

      await prisma.tag.createMany({
        data: tagsData,
        skipDuplicates: true,
      });
    }

    return NextResponse.json(
      {
        message: "Content created successfully",
        content: newContent,
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
