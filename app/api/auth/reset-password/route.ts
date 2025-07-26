import { NextRequest, NextResponse } from "next/server"
import { passwordSchema } from "@/lib/zod"
import prisma from "@/lib/db"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";


export async function POST(req : NextRequest) {
    try{
        const body = await req.json();
        const { token, newPassword } = body;

        if(!token || !newPassword){
            return NextResponse.json({
                message : "Something went wrong, Server error"
            }, {
                status : 400
            })
        };

        const validPassword = passwordSchema.safeParse(newPassword);
        if(!validPassword.success){
            return NextResponse.json({
                message : "Something went wrong, Server error"
            }, {
                status : 400
            })
        };

        // check token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id : string
        }

        // hash password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where : {
                id : decoded.id
            },

            data : {
                password : hashedPassword
            }
        });

        return NextResponse.json({
            message : "Password updated successfully"
        }, {
            status : 200
        });
    }
    catch(error){
        return NextResponse.json({
            message : "Something went wrong, Server error",
            error : error
        }, {
            status : 400
        })
    }
}