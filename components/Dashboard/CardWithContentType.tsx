"use client";

import { CreateLink, GetContents } from "@/lib/api/content";
import { ContentFetchResponse } from "@/types/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import TwitterEmbed from "./TwitterEmbed";
import YoutubeEmbed from "./YoutubeEmbed";
import SideNavbar from "./SideNavbar";
import Spinner from "../Spinner";

export default function CardWithContentType({
  contentType,
}: {
  contentType: string;
}) {
  const [contents, setContents] = useState<ContentFetchResponse[]>([]);
  const [shareLinks, setShareLinks] = useState<Record<string, string>>({});
  const [loadingShare, setLoadingShare] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const fetchContents = async () => {
    try {
      setLoading(true);
      const response = await GetContents();
      if (!response) {
        toast.error(response.message);
        setLoading(false);
        return;
      }
      setContents(response.data);
      toast.success(response.message);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again");
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const renderEmbed = (content: ContentFetchResponse) => {
    switch (content.contentType) {
      case "Twitter":
        return <TwitterEmbed url={content.url} />;
      case "Youtube":
        return <YoutubeEmbed url={content.url} />;
      case "Document":
        return (
          <iframe
            src={content.url}
            title={content.title}
            width="100%"
            height="600px"
            style={{ border: "none" }}
          />
        );
    }
  };

  const handleShare = async (contentId: string) => {
    setLoadingShare((prev) => ({ ...prev, [contentId]: true }));
    try {
      const res = await CreateLink(contentId, "Enable");
      console.log(res);

      if (res.hash) {
        const shareUrl = `${window.location.origin}/share/${res.hash}`;
        setShareLinks((prev) => ({ ...prev, [contentId]: shareUrl }));
        toast.success("Share link created!");
      } else {
        toast.error(res.message || "Failed to create link");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while sharing");
    } finally {
      setLoadingShare((prev) => ({ ...prev, [contentId]: false }));
    }
  };


  if (loading) {
    return <Spinner />;
  }

  if (contents.length === 0) {
    return (
      <div className="text-center text-2xl font-OpenSans flex justify-center items-center h-screen">
        No {contentType} content found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="space-y-4">
        <SideNavbar text={contentType + " Content"} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {contents
            .filter((content) => content.contentType === contentType)
            .map((content, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 flex flex-col gap-2 shadow-md shadow-gray-300 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <p>{content.title}</p>

                  <div className="flex gap-2">
                    <button onClick={() => handleShare(content.id)} disabled={loadingShare[content.id]}>
                      {loadingShare[content.id] ? (
                        <div className="small-spinner"></div>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4 cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                          />
                        </svg>
                      )}
                    </button>

                    
                    {shareLinks[content.id] && (
                        <div className="mt-2 bg-gray-100 p-2 rounded text-sm">
                            <p className="text-green-700 break-all">{shareLinks[content.id]}</p>
                            <button
                            onClick={() => navigator.clipboard.writeText(shareLinks[content.id])}
                            className="text-blue-500 underline text-xs mt-1"
                            >
                            Copy Link
                            </button>
                        </div>
                     )}


                    <p>
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4 cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                    </p>
                  </div>
                </div>

                <div>{renderEmbed(content)}</div>

                <div>
                  <p>{content.description}</p>
                </div>

                <div className="flex gap-2 flex-wrap">
                    {
                        content.tags.map((tag, index) => {
                            return (
                                <div key={index} className="bg-gray-100 p-2 rounded-xl text-sm">
                                    <p className="text-green-700 break-all">#{tag.name} </p>
                                </div>
                            )
                        })
                    }
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
