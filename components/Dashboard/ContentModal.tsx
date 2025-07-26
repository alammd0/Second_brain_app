"use client";

import { CreateContent } from "@/lib/api/content";
import { useState } from "react"
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function ContentModal({ closeModal }: { closeModal: () => void }) {

    const [content, setContent] = useState({
        title: "",
        description: "",
        tags: "",
        url: "",
        contentType : "Document"
    });

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setContent({
            ...content,
            [e.target.name]: e.target.value
        })
    }

    const router = useRouter();

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const contentData = {
                ...content,
                tags : typeof content.tags === "string"
                ? content.tags.split(",").map(tag => tag.trim())
                : content.tags
            }; 
            
            const response = await CreateContent(contentData);
            
            if(!response){
                toast.error(response.message);
                return;
            }

            toast.success(response.message);
            router.push("/dashboard");
            closeModal();
        }
        catch(error){
           console.error(error);
           toast.error("Something went wrong, please try again");
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-500/65 bg-opacity-10 flex items-center justify-center z-10">
            <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-md font-OpenSans">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-700">Add Content</h2>
                    <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <form className="flex flex-col gap-2 font-OpenSans" onSubmit={submitHandler}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-sm font-medium text-gray-900">Title</label>
                        <input type="text" onChange={changeHandler} value={content.title} name="title" id="title" className="px-4 py-2 border border-gray-400 rounded-md w-full outline-none focus:border-gray-800 text-gray-500" placeholder="Title" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="text-sm font-medium text-gray-900">Description</label>
                        <textarea name="description" value={content.description} onChange={changeHandler} id="description" rows={3} className="px-4 py-2 border border-gray-400 rounded-md w-full outline-none focus:border-gray-800  text-gray-500" placeholder="Description"></textarea>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="tags" className="text-sm font-medium text-gray-900">Tags</label>
                        <input type="text" name="tags" id="tags" value={content.tags} onChange={changeHandler} className=" text-gray-500 px-4 py-2 border border-gray-400 rounded-md w-full outline-none focus:border-gray-800" placeholder="Tags" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="url" className="text-sm font-medium text-gray-900">URL</label>
                        <input type="text" name="url" id="url" value={content.url} onChange={changeHandler} className=" text-gray-500 px-4 py-2 border border-gray-400 rounded-md w-full outline-none focus:border-gray-800" placeholder="URL" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="contentType" className="text-sm font-medium text-gray-900">Content Type</label>
                        <select name="contentType" id="contentType" value={content.contentType} onChange={changeHandler} className="text-gray-500 px-4 py-2 border border-gray-900 rounded-md w-full outline-none focus:border-gray-800">
                            <option value="Document">Document</option>
                            <option value="Twitter">Twitter</option>
                            <option value="Youtube">Youtube</option>
                        </select>
                    </div>

                    <button className="px-4 mt-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-700 transition duration-100 cursor-pointer" type="submit">Add Content</button>

                </form>
            </div>
        </div>
    )
}