import { Share } from "lucide-react";

export default function SideNavbar({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 bg-gray-600 text-gray-100 transition rounded-lg font-OpenSans shadow-xl">
      <div className="text-xl font-bold">{text}</div>

      <div className="flex items-center gap-3">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-xl text-[14px] font-bold cursor-pointer
            hover:bg-gray-400 transition duration-100 flex items-center gap-2"
        >
          <div className="text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
          </div>
          <span className="text-sm">Share</span>
        </button>

        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-[14px] font-bold cursor-pointer
            hover:bg-gray-500 transition duration-100 flex items-center gap-2"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <span>Add content</span>
        </button>
      </div>
    </div>
  );
}
