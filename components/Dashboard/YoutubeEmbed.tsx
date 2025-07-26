const extractVideoId = (url: string) => {
  let videoId = "";
  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1];
  } else if (url.includes("watch?v=")) {
    videoId = url.split("v=")[1]?.split("&")[0];
  }

  if (!videoId) {
    console.error("Invalid YouTube URL");
    return null;
  }

  return videoId;
};

export default function YoutubeEmbed({ url }: { url: string }) {
  const videoId = extractVideoId(url);
  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}
