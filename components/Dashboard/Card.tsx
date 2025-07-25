import InstagramEmbed from "./InstagramEmbed";
import TwitterEmbed from "./TwitterEmbed";


interface CardProps {
    contentType : string;
    title : string;
    description : string;
    url : string;
    tags : string[];
}


export default function Card({ contentType, title, description, url, tags }: CardProps) {
    const renderEmbed = () => {
        switch(contentType){
            case "Document" : 
                return (
                    <iframe 
                        src={url} 
                        title={title} 
                        width="100%" 
                        height="600px"
                        style={{ border: "none" }}
                    />
                )
            case "Twitter" : 
                return (
                    <TwitterEmbed url={url} />
                )
            case "Youtube" : 
                const videoId = url.split("v=")[1];
                console.log("Video Id - ",videoId);
                return (
                    <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                );

            case "Instagram" : 
                return (
                    <InstagramEmbed url={url} />
                )
            case "LinkedIn" : 
                return (
                    <blockquote className="linkedin-embed-post" data-href={url} data-show-count="false" data-width="600" data-height="600" style={{ border: "none" }}> </blockquote>
                )
        }
    }

    return (
        <div>
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-sm">{description}</p>
            </div>

            <div>
                {renderEmbed()}
            </div>
        </div>  
    )
}