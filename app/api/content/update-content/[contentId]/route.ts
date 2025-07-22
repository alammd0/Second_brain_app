import { getUserId } from "@/lib/auth";
import prisma from "@/lib/db";
import { updateContentSchema } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = await getUserId(req);
    console.log(userId);
    const contentId = req.nextUrl.pathname.split("/").pop();
    console.log(contentId);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = updateContentSchema.safeParse(body);
    if (!data.success) {
      return NextResponse.json(
        { message: data.error.message },
        { status: 411 }
      );
    }

    const { title, description, tags, url, contentType } = data.data;

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const existingContent = await prisma.content.findFirst({
      where: { id: contentId, userid: userId },
      include: { tags: true },
    });

    if (!existingContent) {
      return NextResponse.json(
        {
          message: "No content found with this id or you're not the owner",
        },
        { status: 404 }
      );
    }

    const updatedContent = await prisma.content.update({
      where: { id: contentId },
      data: {
        title: title ?? existingContent.title,
        description: description ?? existingContent.description,
        contentType: contentType ?? existingContent.contentType,
        Url: url ?? existingContent.Url,
      },
      include: { tags: true },
    });

    if (Array.isArray(tags)) {
      // then update tags
      const uniqueTags = [...new Set(tags)];
      await prisma.content.update({
        where: { id: contentId },
        data: {
          tags: {
            create: uniqueTags.map((tag) => ({ name: tag })),
          },
        },
      });
    }

    return NextResponse.json(
      {
        message: "Content updated successfully",
        content: {
          ...updatedContent,
          tags: updatedContent.tags.map((tag) => tag.name),
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
