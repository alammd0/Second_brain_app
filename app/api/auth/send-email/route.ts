import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import jwt from "jsonwebtoken";
import { generateResetPasswordHtml } from "@/lib/emails/renderResetEmail";
import { sendEmail } from "@/lib/nodemail";

export async function POST(request: NextRequest) {
    try{

        const body = await request.json(); 
        const email = body.email;

        // check user exiting or not using email
        const existingEmail = await prisma.user.findUnique({
            where : {
                email : email
            }
        });

        if(!existingEmail){
            return NextResponse.json({
                message : "User not found, Please check your email or Signup"
            }, {
                status : 403
            })
        };

        // generate token 
        const payLoad = {
            id : existingEmail.id,
            name : existingEmail.name,
            username : existingEmail.username
        }

        const token = jwt.sign(payLoad, process.env.JWT_SECRET as string, {
            expiresIn : "1h"
        });

        // if user found then send email to reset password
        const resetURL = `http://localhost:3000/reset-password?token=${token}`;
        const html = await generateResetPasswordHtml(existingEmail.name, resetURL);
        await sendEmail(existingEmail.email, "Password Reset Instructions", html);


        return NextResponse.json({
            message : "Email sent successfully"
        }, {
            status : 200
        })

        

    }
    catch(error){
        return NextResponse.json({
            message : "Something went wrong, Server error",
            error : error
        }, {
            status : 501
        })
    }
}