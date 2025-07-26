
import { getUserId } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest) {
    try{

        console.log("get single content request");

        console.log("req", req.json());
        // content Id from request ki body 
        const body = await req.json();

        console.log("body", body);

        const contentId = body.contentId;
        console.log("contentId", contentId);
        const userId = await getUserId(req);

        if(!userId){
            return NextResponse.json({
                message : "Unauthorized"
            }, {
                status : 401
            })
        }

        // check content exiting or not using contentId
        const existingContent = await prisma.content.findUnique({
            where : {
                id : contentId
            }
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

        return NextResponse.json({
            message : "Content fetched successfully",
            data : existingContent
        },
        {
            status : 200
        })
    }
    catch(error){
        return NextResponse.json({
            message : "Something went wrong, Server error",
            error : error
        }, {
            status : 500
        })
    }
}