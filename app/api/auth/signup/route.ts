import { NextRequest, NextResponse } from "next/server";
import { createUserSchema } from "@/lib/zod";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try{

        const body = await request.json();
        const data = createUserSchema.safeParse(body);

        if(!data.success){
            return NextResponse.json({
                message : data.error.message
            }, {
                status : 411
            })
        }

        const { name, username, email, password } = data.data;

        // check user exiting or not using username
        const existingUser = await prisma.user.findUnique({
            where : {
                username : username
            }
        });

        if(existingUser){
            return NextResponse.json({
                message : "User already exist"
            }, {
                status : 403
            }) 
        }

        // check user exiting or not using email
        const existing = await prisma.user.findUnique({
            where  : {
                email : email
            }
        });

        if(existing){
            return NextResponse.json({
                message : "User already exist"
            }, {
                status : 403
            })
        };

        // hashed password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user 
        const newUser = await prisma.user.create({
            data : {
                name : name,
                username : username,
                email : email,
                password : hashedPassword
            }
        });

        return NextResponse.json({
            message : "User created successfully",
            data : {
                id : newUser.id,
                name : newUser.name,
                username : newUser.username,
                email : newUser.email,
                createdAt : newUser.createdAt
            },
        } , {
            status : 201
        });
    }
    catch(error){
        return NextResponse.json(
            {
                message : "Something went wrong, Server error",
                error : error
            },
            {
                status : 400
            }
        )
    }
}