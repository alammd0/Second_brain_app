import { randomstring } from "@/config/randomstring";
import { getUserId } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    try{
        const userId = getUserId(req);

        const { contentId, shareType } = await req.json();

        if(!userId){
            return NextResponse.json({
                message : "User not found"
            }, {
                status : 401
            })
        }

        if(shareType === "Enable"){

            const hashLink = randomstring(10);

            const createLink = await prisma.link.create({
                data : {
                    hash : hashLink,
                    contentId : contentId,
                }
            })

            return NextResponse.json({
                message : "Link created successfully",
                hash : createLink.hash 
            }, {
                status : 200
            })
        }
        else {
            await prisma.link.deleteMany({
                where : {
                    contentId : contentId
                }
            })

            return NextResponse.json({
                message : "Link deleted successfully"
            }, {
                status : 200
            })
        }
    }
    catch(error){
        return NextResponse.json({
            message : "Error occurred while creating link",
            error : error
        }, {
            status : 500
        })
    }
}