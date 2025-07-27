"use client";

import { sendResetPasswordEmail } from "@/lib/api/auth";
import { useState } from "react";
import { toast } from "sonner";
import Spinner from "./Spinner";

export default function SendEmailWithToken() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            setLoading(true);
            const response = await sendResetPasswordEmail(email);

            if(!response){
                toast.error(response.message);
                setLoading(false);
                return;
            }

            toast.success(response.message);
            setLoading(false);
            return;
        }
        catch(error){
            console.log(error);
        }

        setEmail("");
    }

    if(loading){
        return <Spinner />
    }

  return (
    <div className="flex h-screen flex-col items-center justify-center font-OpenSans">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl flex flex-col gap-4 p-5 border border-gray-200">
        <h1>Generate Link for Reset Password</h1>

        <form  onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="email">
              {" "}
              Email <sup className="text-red-500">*</sup>
            </label>
            <input
              className="px-4 py-2 border border-gray-400 rounded-md w-full outline-none focus:border-gray-800"
              type="email"
              name="email"
              placeholder="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-700 transition duration-100 cursor-pointer">
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
}
