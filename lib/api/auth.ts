import { LoginData, User } from "@/types/types";
import { toast } from "sonner";


export const signup = async (data : User) => {
    const response = await fetch("/api/auth/signup", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    });

    return response.json();
}

export const login = async (data : LoginData) => {
    const response = await fetch("/api/auth/login", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    });
    return response.json();
}

export const sendResetPasswordEmail = async (email : string) => {

}

export const resetPassword = async (token : string, newPassword : string) => {

}