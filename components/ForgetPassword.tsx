"use client";

import { resetPassword } from "@/lib/api/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Spinner from "./Spinner";

export default function ForgetPasswordPage(){

    const [newPassword, setNewPassword] = useState("");
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    if(!token){
        return <div>Token not found</div>;
    }
    // console.log(token);

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        try{
            setLoading(true);
            const response = await resetPassword(token, newPassword);
            console.log(response);

            if(!response){
                toast.error(response.message);
                setLoading(false);
                return;
            }

            toast.success(response.message);
            router.push("/login");
            setLoading(false);
            return;
        }
        catch(error){
            console.log(error);
        }
    }

    if(loading){
        return <Spinner/>
    }


    return (
        <div className="flex h-screen flex-col items-center justify-center font-OpenSans">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl flex flex-col gap-4 p-5 border border-gray-200">
        <h1 className="text-center text-3xl font-semibold text-gray-800 font-OpenSans">
          Reset Password
        </h1>

        <form  onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="newPassword">
              {" "}
              New Password <sup className="text-red-500">*</sup>
            </label>
            <input
              className="px-4 py-2 border border-gray-400 rounded-md w-full outline-none focus:border-gray-800"
              type="password"
              name="newPassword"
              placeholder="New Password"
              id="newPassword"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-700 transition duration-100 cursor-pointer">
                 Update Password
          </button>
        </form>
      </div>
    </div>
    )
}