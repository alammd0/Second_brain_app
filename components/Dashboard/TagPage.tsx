"use client";

import { GetTags } from "@/lib/api/content";
import { Tag } from "@/types/types";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import Spinner from "../Spinner";

export default function TagPage(){

    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchTags = async () => {
        try {
            setLoading(true);
            const response = await GetTags(); 
            if(!response.data){
                toast.error(response.message);
                return;
            }
            setTags(response.data);
            toast.success(response.message);
            setLoading(false);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTags();
    }, []);

    if(loading){
        return <Spinner />
    }

    return (
        <div className="flex gap-4 flex-wrap">
            {
                tags.map((tag, index) => {
                    return (
                        <div key={index} className="bg-gray-100 p-2 rounded-xl text-sm">
                            <p className="text-green-700 break-all">#{tag.name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}