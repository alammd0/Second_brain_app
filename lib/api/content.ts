import { Content } from "@/types/types";


export const CreateContent = async (data : Content) => {

    const response = await fetch("/api/content/add-content", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    }); 

    return response.json();
}

export const GetContents = async () => {
    const response = await fetch("/api/content/get-contents", {
        method : "GET",
        headers : {
            "Content-Type" : "application/json"
        }
    });

    return response.json();
}