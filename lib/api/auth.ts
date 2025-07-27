import { LoginData, User } from "@/types/types";

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
    const response = await fetch("/api/auth/send-email", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            email : email
        })
    });

    return response.json();
}

export const resetPassword = async (token : string, newPassword : string) => {
    const response = await fetch("/api/auth/reset-password", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            token : token,
            newPassword : newPassword
        })
    });

    return response.json();
};