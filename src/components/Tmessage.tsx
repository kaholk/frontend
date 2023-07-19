
import Icon from '@mdi/react';
import { mdiAccount } from "@mdi/js"
import { Timage } from "./Timage"

export type TmessageProps = {
    messageDirection?: "left" | "right";
    message?: string;
    avatarUrl?: string;
    owner?: string;
    sendDate?:  string;
    messageStatus?: string;
}

export const Tmessage = ({
    messageDirection = "left",
    message = "",
    avatarUrl = "",
    owner = "",
    sendDate = "",
    messageStatus = ""
    }:TmessageProps ) => {
    const messageClass = messageDirection == "left" ? "chat chat-start" : "chat chat-end";

    return (<>
        <div className={messageClass}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <Timage url={avatarUrl} onErrorElement={<Icon path={mdiAccount}/>}/>
                </div>
            </div>
            <div className="chat-header">
                <span>{owner}</span> <span className="text-xs opacity-50">{sendDate}</span>
            </div>
            <div className={`chat-bubble ${ messageDirection == 'right' ? 'bg-primary': ''}`}>{message}</div>
            <div className="chat-footer opacity-50">
                {messageStatus}
            </div>
        </div>
    </>)
}