
import { useState } from "react";

export type TimageProps = {
    url: string,
    onLoadingElement?: JSX.Element | "dots" | "ring" | "ball" | "bar" | "infinity" | "spinner";
    onErrorElement?: JSX.Element;
}

export const Timage = ({
        url = "",
        onLoadingElement = "ring",
        onErrorElement,
    }:TimageProps) => {
        const [loadStatus, setLoadStatus] = useState<"loading" | "error" | "success">("loading");

        const renderOnLoadingElement = () => {
            switch(onLoadingElement){
                case "dots": return <span className="loading loading-dots w-full"/>;
                case "ring": return <span className="loading loading-ring w-full"/>;
                case "bar": return <span className="loading loading-bars w-full"/>;
                case "infinity": return <span className="loading loading-infinity w-full"/>;
                case "ball": return <span className="loading loading-ball w-full"/>;
                case "spinner": return <span className="loading loading-spinner w-full"/>;
                default: return onLoadingElement;
            }
        }

        const renderOnErrorElement = () =>{
            switch(onErrorElement){
                default: return onErrorElement;
            }
        }

        
    return(<>
        {loadStatus == "loading" ? renderOnLoadingElement() : null}
        {loadStatus == "error" ? renderOnErrorElement() : null}
        <img 
            src={url}
            alt=""
            style={{display: loadStatus == "success" ? "block" : "none"}}
            // onLoad={() => setTimeout(()=>setLoadStatus("success"), 5000) } 
            onLoad={() => setLoadStatus("success")} 
            onError={() => setLoadStatus("error")}
        />
    </>)
}