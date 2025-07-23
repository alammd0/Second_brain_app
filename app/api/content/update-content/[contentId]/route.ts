
import { getUserId } from "@/lib/auth";
import prisma from "@/lib/db";
import { updateContentSchema } from "@/lib/zod";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  try{

    const body = await req.json();
    const userId = await getUserId(req);
    const contentId = req.nextUrl.pathname.split("/").pop();

    if (!userId) {
      return NextResponse.json({
        message : "Unauthorized"
      }, {
        status : 401
      })
    }

    const data = updateContentSchema.safeParse(body);

    if(!data.success){
      return NextResponse.json({
        message : data.error.message
      }, {
        status : 411
      })
    }

    const { title, description, tags, url, contentType } = data.data;

    const existingUser = await prisma.user.findUnique({
      where : { id : userId }
    });

    if(!existingUser){
      return NextResponse.json({
        message : "User not found"
      }, {
        status : 400
      })
    }

    const existingContent = await prisma.content.findFirst({
      where : { userid : userId },
      include : { tags: true },
    });

    if(!existingContent){
      return NextResponse.json({
        message : "No content found with this id or you're not the owner"
      }, {
        status : 404
      })
    }

    const updatedContent = await prisma.content.update({
      where : { id : contentId },
      data : {
        title : title ?? existingContent.title,
        description : description ?? existingContent.description,
        contentType : contentType ?? existingContent.contentType,
        url : url ?? existingContent.url,
      },
      include : { tags: true },
    });

    
    if(tags){  
      const tagsData = tags.map((tag) => ({
        name: tag,
        contentId: updatedContent.id,
      }));

      await prisma.tag.createMany({
        data: tagsData,
        skipDuplicates: true,
      });
    };

    return NextResponse.json({
      message : "Content updated successfully",
      data : updatedContent
    }, {
      status : 200
    })
  }
  catch(error){
    console.error(error);
    return NextResponse.json(
      {
        message : "Something went wrong, Server error"
      },
      {
        status : 500
      }
    )
  }
}