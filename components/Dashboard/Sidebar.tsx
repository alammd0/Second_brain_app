// components/Sidebar.tsx
"use client";


import { Home, X, FileText, ExternalLink, Hash, Video } from "lucide-react";
import Link from "next/link";
import WebsiteIcons from "../icons/WebsiteIcons";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const navItems  = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Tweets", href: "/dashboard/tweets", icon: X },
  { name: "Videos", href: "/dashboard/videos", icon : Video },
  { name: "Documents", href: "/dashboard/documents", icon: FileText },
  { name: "Links", href: "/dashboard/links", icon: ExternalLink },
  { name: "Tags", href: "/dashboard/tags", icon: Hash },
];

export default function Sidebar() {
  const router = useRouter();

  const pathName = usePathname();

  const logoutHandler = async () => {
    const response =  await fetch("/api/auth/logout", {
      method: "POST",
    });

    toast.success("Logout successful");
    router.push("/login");
  };

  return (
    <aside className="w-64 h-screen bg-white border-r px-6 py-8 flex flex-col justify-between font-OpenSans">
      <div>
        <div className="text-xl font-bold flex items-center gap-2 mb-10">
          <span className=" cursor-pointer">
            <WebsiteIcons />
          </span>
          Second Brain
        </div>

        <nav className="space-y-4 flex flex-col">
          {navItems.map(({ name, href, icon: Icon }) => {
            const isActive = pathName === href;
            return (
              <Link
                key={name}
                href={href}
                className={`flex items-center gap-3 hover:bg-gray-700 hover:text-gray-300 px-5 py-2 text-gray-700 transition rounded-lg
                 ${isActive ? "bg-gray-700 text-white" : ""}`}
              >
                <Icon className={`w-5 h-5 text-gray-700 ${isActive ? "text-white" : ""}`} />
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3 px-5 py-2 text-gray-700 transition rounded-lg">
        <button
          onClick={() => logoutHandler()}
          className="bg-red-400 text-white px-4 py-2 rounded-xl text-[14px] font-bold cursor-pointer
            hover:bg-red-200 transition duration-100"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
