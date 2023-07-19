

import { TmessageProps, Tmessage } from './Tmessage'

import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'

import { Icon } from "@mdi/react"
import { mdiDotsVertical, mdiSend, mdiArrowDown } from "@mdi/js"

import { useEffect, useRef, useState } from "react"

export type SendMessageCallback =  (message: string) => void


export type TmessagesContainerProps = {
    messages?: TmessageProps[];
    chatName?: string;
    avatarUrl?: string;
    sendMessageCallback?: SendMessageCallback
}

export const TmessagesContainer = ({
        messages = [],
        chatName = "",
        avatarUrl = "",
        sendMessageCallback = () => {}
    }:TmessagesContainerProps) =>{

    const [newMessage, setNewMessage] = useState("")
    const [atBottom, setAtBottom] = useState(false)
    const [showScrollButton, setShowScrollButton] = useState(false)
    const virtuosoRef = useRef<VirtuosoHandle>(null)
    const showScrollButtonTimeOut = useRef<number|null>(null)
    

    const scollToBotton = () =>{
        if (virtuosoRef.current == null) return;
        virtuosoRef.current.scrollToIndex({ index: messages.length - 1, behavior: 'smooth' })
        setShowScrollButton(false)
    }

    useEffect(()=>{
        if(showScrollButtonTimeOut.current != null)
            clearInterval(showScrollButtonTimeOut.current)
        if(!atBottom){
            showScrollButtonTimeOut.current = setTimeout(()=> setShowScrollButton(true), 500)
        }
        else{
            setShowScrollButton(false)
        }
    }, [atBottom, setShowScrollButton])
    
    const onSendButtonPress = () =>{
        sendMessageCallback(newMessage);
        setNewMessage("");
        // scollToBotton()
    }

    return(<>
    <div className='p-5 bg-base-200 rounded-xl flex flex-col grow'>
        <div className='flex flex-row justify-between px-2'>
            <div className='flex flex-row'>
                <div className="avatar self-start">
                    <div className="w-12 rounded-full">
                        <img src={avatarUrl} />
                    </div>
                </div>
                <div className='flex flex-col ml-4'>
                    <div className='text-lg'>
                        {chatName}
                    </div>
                    <div className='text-xs'>
                        Online
                    </div>
                </div>
            </div>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <Icon path={mdiDotsVertical} size={1}/>
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul>
            </div>
        </div>
        <div className="divider"/>
        <div className='grow relative'>
            <Virtuoso
                className='no-scrollbar'
                totalCount={messages.length}
                data={messages}
                initialTopMostItemIndex={messages.length-1}
                atBottomStateChange={(bottom)=>{
                    setAtBottom(bottom)
                }}
                ref={virtuosoRef}
                followOutput={'auto'}
                itemContent={(_idx, m) => 
                <Tmessage 
                    message={m.message} 
                    avatarUrl={m.avatarUrl} 
                    messageDirection={m.messageDirection} 
                    messageStatus={m.messageStatus} 
                    owner={m.owner}  
                    sendDate={m.sendDate}
                />}
            />
            {showScrollButton && (
                <div className='flex justify-center'>
                    <button onClick={scollToBotton} className='bg-primary btn-circle flex justify-center items-center bottom-2 absolute'>
                        <Icon path={mdiArrowDown} size={1}/>
                    </button>
                </div>
            )}
        </div>
        <div className="divider"/>
        <div className='flex flex-row'>
            <input 
                type="text" 
                placeholder="Type here" 
                className="input input-bordered input-primary w-full mr-5" 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e)=> e.key == "Enter" && onSendButtonPress()}
            />
            <button className="btn btn-primary" onClick={onSendButtonPress}>
                <Icon path={mdiSend} size={1} rotate={-20}/>
            </button>
        </div>
    </div>
    </>)
}