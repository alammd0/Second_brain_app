import { getUserId } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest) {
    try{

        const userId = await getUserId(req);
        
        if(!userId){
            return NextResponse.json({
                message : "Unauthorized"
            }, {
                status : 401
            })
        }

        const tags = await prisma.tag.findMany({
            select : {
                name : true
            }
        });

        if(!tags){
            return NextResponse.json({
                message : "Tags not found"
            }, {
                status : 404
            })
        };

        return NextResponse.json({
            message : "Tags fetched successfully",
            data : tags
        },
        {
            status : 200
        })

    }
    catch(error){
        console.log(error);
        return NextResponse.json({
            message : "Something went wrong, Server error",
            error : error
        } ,
        {
            status : 500
        })
    }
}