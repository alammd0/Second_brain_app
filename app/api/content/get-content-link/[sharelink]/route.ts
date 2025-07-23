import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest, { params }: { params: { sharelink: string } }) {
    try{
        const { sharelink } = await params;
        
        if(!sharelink){
            return NextResponse.json({
                message : "Share link not found"
            }, {
                status : 404
            })
        }

        const link = await prisma.link.findUnique({
            where : {
                hash : sharelink
            }
        });

        if(!link){
            return NextResponse.json({
                message : "Share link not found"
            }, {
                status : 404
            })
        }

        // find content by id
        const content = await prisma.content.findFirst({
            where : {
                id : link.contentId
            },
            select : {
                title : true,
                description : true,
                url : true,
                contentType : true,
                tags : {
                    select : {
                        name : true
                    }
                }
            }
        });

        // find user 
        const user = await prisma.user.findFirst({
            where : {
                id : link.userId ?? undefined
            },
            select : {
                name : true,
                email : true,
                username : true
            }
        })

        if(!content){
            return NextResponse.json({
                message : "Content not found"
            }, {
                status : 404
            })
        };

        return NextResponse.json({
            message : "Content link fetched successfully",
            content : content,
            user : user
        },
        {
            status : 200
        })
    }
    catch(error){
        return NextResponse.json({
            message : "Error occurred while getting content link"
        }, {
            status : 50
        })
    }
}