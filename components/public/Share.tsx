"use client";

import { GetShareLink } from "@/lib/api/content";
import { ContentFetchResponse } from "@/types/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import TwitterEmbed from "../Dashboard/TwitterEmbed";
import YoutubeEmbed from "../Dashboard/YoutubeEmbed";

export default function Share() {
  const sharelink = usePathname().split("/").pop();
  const [content, setContent] = useState<ContentFetchResponse>();

  useEffect(() => {
    if (!sharelink) return;
    
    const fetchShareLink = async () => {
      try {
        const response = await GetShareLink(sharelink);
        if (!response) return;

        setContent(response.content);
        toast.success(response.message);
      } catch (error) {
        console.error(error);
      }
    };

    fetchShareLink();
  }, [sharelink]);

  if (!sharelink) {
    return <div>Share link not found</div>;
  }

  if (!content) {
    return <div>Loading...</div>;
  }

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
      default:
        return <p>Unsupported content type</p>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen font-OpenSans">
      <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-2 shadow-md shadow-gray-300 border border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold font-OpenSans">{content.title}</p>
        </div>

        <div>{renderEmbed(content)}</div>

        <div>
          <p>{content.description}</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {content.tags.map((tag, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded-xl text-sm">
              <p className="text-green-700 break-all">#{tag.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
