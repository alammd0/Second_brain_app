

import Script from "next/script";
import { useEffect } from "react";

export default function TwitterEmbed({ url }: { url: string }) {
  const fixedUrl = url.replace("x.com", "twitter.com");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      />

      <blockquote className="twitter-tweet" data-theme="dark">
        <a href={fixedUrl}></a>
      </blockquote>
      
    </>
  );
}
