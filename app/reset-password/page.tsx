import { Suspense } from "react";
import ForgetPasswordPage from "@/components/ForgetPassword";

export default function ResetPassword(){
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <ForgetPasswordPage/>
            </Suspense>
        </div>
    )
}