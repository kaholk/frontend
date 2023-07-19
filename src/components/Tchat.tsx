
import { Timage } from "./Timage";



export type TchatOnClickCallback = (chatId: number) => void

export type TchatProps = {
    id: number
    title: string;
    desc: string;
    status: string;
    avatarUrl?: string;
    onClickCallback?: TchatOnClickCallback
}

export const Tchat = ({
    id,
    desc,
    title,
    status,
    avatarUrl = "",
    onClickCallback = () => {}
    }:TchatProps) =>{
        
    
    return(<>
        <div className="flex flex-row justify-between items-end p-2" onClick={() => onClickCallback(id)}>
            <div className="flex flex-row">
                <div className="avatar self-start">
                    <div className="w-12 rounded-full">
                        <Timage url={avatarUrl}/>
                    </div>
                </div>
                <div className="ml-2">
                    <div className="text-lg">{title}</div>
                    <div className="text-xs">{desc}</div>
                </div>
            </div>
            <div>
                <div className="text-xs">{status}</div>
            </div>
        </div>
    </>)
}