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


export const CreateLink = async (contentId : string, shareType : "Enable" | "Disable" | undefined) => {
    const data = {
        contentId : contentId,
        shareType : shareType
    }
    
    const response = await fetch("/api/content/create-link", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    });
    return response.json();
}

export const GetShareLink = async (sharelink : string | undefined) => {
    const response = await fetch(`/api/content/get-content-link?sharelink=${sharelink}`);
    return response.json();
}

export const GetTags = async () => {
    const response = await fetch("/api/content/get-tags");
    return response.json();
}