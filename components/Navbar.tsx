import WebsiteIcons from "./icons/WebsiteIcons";

export default function Navbar() {
  return (
    <div className="bg-gray-100 h-16 flex items-center justify-between px-4 py-2">
      <div className="md:w-9/12 w-11/12 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <WebsiteIcons />
          </div>
          <div className="font-bold text-xl">Second Brain</div>
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-xl text-[14px] font-bold cursor-pointer
            hover:bg-blue-400 transition duration-100">
            Login
          </button>

          <button className="px-4 py-2 rounded-xl text-[14px] font-bold cursor-pointer
            hover:bg-blue-200 transition duration-100">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
