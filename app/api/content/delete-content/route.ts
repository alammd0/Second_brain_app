import { getUserId } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req : NextRequest) {
    try{
        const body = await req.json();
        const contentId = body.contentId;
        console.log("contentId", contentId)
        const userId = await getUserId(req);

        if(!userId){
            return NextResponse.json({
                message : "Unauthorized"
            }, {
                status : 401
            })
        }
        
        const existingContent = await prisma.content.findFirst({
            where : { id : contentId }
        });


        if(!existingContent){
            return NextResponse.json({
                message : "Content not found"
            }, {
                status : 404
            })
        };

        // check user owning content or not 
        if(existingContent.userid !== userId){
            return NextResponse.json({
                message : "You are not the owner of this content"
            }, {
                status : 403
            })
        };

        await prisma.content.delete({
            where : { id : contentId }
        });

        return NextResponse.json({
            message : "Content deleted successfully"
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