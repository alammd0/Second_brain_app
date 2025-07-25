"use client";

import { GetContents } from "@/lib/api/content";
import { Content } from "@/types/types";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import Card from "./Card";

export default function Dashboard() {

    const [contents, setContents] = useState<Content[]>([]);

    const fetchContents = async () => {
        try{
            const response = await GetContents();

            if(!response){
                toast.error(response.message);
                return;
            }
            setContents(response.data);
            toast.success(response.message);
        }
        catch(error){
            console.error(error);
            toast.error("Something went wrong, please try again");
        }
    }

    useEffect ( () => {
        fetchContents();
    }, []);

    console.log(contents);


    return (
        <div className="p-8 mt-10">
            <h1 className="text-3xl font-bold mb-6">All Content</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    contents.map((content, index) => (
                        <Card key={index} contentType={content.contentType} title={content.title} description={content.description} url={content.url} tags={content.tags} />
                    ))
                }
            </div>
        </div>
    )
}