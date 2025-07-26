import SideNavbar from "@/components/Dashboard/SideNavbar";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <SideNavbar text="Welcome to Second Brain" />

            <p className="text-2xl font-OpenSans text-center">Welcome to Second Brain, a platform that allows you to collect and share content from the web.</p>

            <div className="flex gap-10 justify-center items-center">
                <Link href="/dashboard/tweets">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-xl text-[14px] font-bold cursor-pointer
                    hover:bg-gray-400 transition duration-100">
                        Tweets
                    </button>
                </Link>

                <Link href="/dashboard/videos">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-xl text-[14px] font-bold cursor-pointer
                    hover:bg-gray-400 transition duration-100">
                        Youtube
                    </button>
                </Link>

                <Link href="/dashboard/documents">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-xl text-[14px] font-bold cursor-pointer
                    hover:bg-gray-400 transition duration-100">
                        Documents
                    </button>
                </Link>

                <Link href="/dashboard/links">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-xl text-[14px] font-bold cursor-pointer
                    hover:bg-gray-400 transition duration-100">
                        Links
                    </button>
                </Link>

                <Link href="/dashboard/tags">
                   <button className="bg-gray-500 text-white px-4 py-2 rounded-xl text-[14px] font-bold cursor-pointer
                    hover:bg-gray-400 transition duration-100">
                        Tags
                    </button>
                </Link>
            </div>
        </div>
    )
}