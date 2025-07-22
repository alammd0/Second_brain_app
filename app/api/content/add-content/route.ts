import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { createContentSchema } from "@/lib/zod";
import { getUserId } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = await getUserId(req);

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

    if (!userId) {
      return NextResponse.json(
        {
          message: "Something went wrong, Server error",
        },
        {
          status: 400,
        }
      );
    }

    // check user exiting or not given user id
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          message: "Something went wrong, Server error",
        },
        {
          status: 400,
        }
      );
    }

    // create content
    const newContent = await prisma.content.create({
      data: {
        title: title,
        description: description,
        Url: url,
        contentType: contentType,
        userid: userId,
      },
    });

    // create tags and connect them to the content
    await prisma.tag.createMany({
      data: tags.map((tag) => ({
        name: tag,
        contentid: newContent.id,
      })),
    });

    // here find tags and contentTags relation with content
    const contentTags = await prisma.tag.findMany({
      where: {
        id: newContent.id,
      },
    });

    return NextResponse.json({
      message: "Content created successfully",
      data: {
        id: newContent.id,
        title: newContent.title,
        description: newContent.description,
        Url: newContent.Url,
        contentType: newContent.contentType,
        tags: contentTags.map((tag) => tag.name),
        createdAt: newContent.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Something went wrong, Server error",
      },
      {
        status: 400,
      }
    );
  }
}
