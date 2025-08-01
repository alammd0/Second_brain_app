
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getUserId = async ( req : NextRequest) => {
    const token = req.cookies.get("token")?.value || "";

    if(!token){
        return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id : string
    }

    return decoded.id;
}