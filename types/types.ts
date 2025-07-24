
export type User = {
    name : string,
    username : string,
    email : string,
    password : string
}

export type LoginData = {
    email : string,
    password : string
}

export type authProps = {
    type : "login" | "signup"
}

