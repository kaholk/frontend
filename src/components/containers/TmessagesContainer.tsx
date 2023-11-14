


import { Virtuoso, VirtuosoHandle, Components } from 'react-virtuoso'

import { Icon } from "@mdi/react"
import { mdiDotsVertical, mdiSend, mdiArrowDown } from "@mdi/js"

import { useEffect, useRef, useState } from "react"
import { useAtom } from "jotai"
import { currentChatDetailsAtom, currentChatIdAtom, currentChatMessagesAtom, userAtom, userChatsAtom } from '../../stores/currentUserAtoms'
import { sendMessage } from '../../api/messages/sendMessage'
import { Tmessage } from '../other/Tmessage'
import { TchatSettingsModal } from '../modals/TchatSettingsModal'


export type SendMessageCallback =  (message: string) => void


const VirtuosoCustomHeader:Components['Header'] = () =>{
    return(<>
        <span className="loading loading-spinner loading-md m-auto block"/>
    </>)
}

export const TmessagesContainer = () => {

    const [newMessage, setNewMessage] = useState("")
    const [atBottom, setAtBottom] = useState(false)
    const [showScrollButton, setShowScrollButton] = useState(false)
    const virtuosoRef = useRef<VirtuosoHandle>(null)
    const showScrollButtonTimeOut = useRef<number|null>(null)
    

    const [currentChatDetails, setCurrentChatDetails] = useAtom(currentChatDetailsAtom)
    const [currentChatMessages, setCurrentChatMessages] = useAtom(currentChatMessagesAtom)
    const [currentUser, setCurrentUser] = useAtom(userAtom)
    const [currentUserChats, setCurrentUserChats] = useAtom(userChatsAtom)
    const [currentChatId, setCurrentChatId] = useAtom(currentChatIdAtom)
    const [chatSettingsModal, setChatSettingsModal] = useState(false)

    const scollToBotton = () =>{
        if (virtuosoRef.current == null) return;
        virtuosoRef.current.scrollToIndex({ index: currentChatMessages.length - 1, behavior: 'smooth' })
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

    useEffect(()=>{
        if (virtuosoRef.current == null) return;
        virtuosoRef.current.scrollToIndex({ index: currentChatMessages.length - 1, behavior: 'auto' })
        setShowScrollButton(false)
    },[currentChatMessages])
    
    const onSendButtonPress = async () =>{
        if((currentChatDetails == null) || (currentUser == null)) return;

        const resoult = await sendMessage({
            chatId: currentChatDetails.id,
            userId: currentUser.id,
            message: newMessage
        })

        if(resoult.status){
            setCurrentChatMessages([
                ...currentChatMessages,
                resoult.data
            ])
            setCurrentUserChats(
                currentUserChats.map(e=> e.id == currentChatId ? {...e, 
                    lastMessage: resoult.data.message, 
                    lastMessageNickname: currentChatDetails.chatMembers.filter(ee=>ee.userId == currentUser.id)[0].nickname,
                    name: currentChatDetails.name
                } : e)
            )
        }

        setNewMessage("");
    }

    return(<>
    <div className='p-5 bg-base-200 rounded-xl flex flex-col grow'>
        <div className='flex flex-row justify-between px-2'>
            <div className='flex flex-row'>
                <div className="avatar self-start">
                    <div className="w-12 rounded-full">
                        <img src={""} />
                    </div>
                </div>
                <div className='flex flex-col ml-4'>
                    <div className='text-lg'>
                        {currentChatDetails?.name}
                    </div>
                    <div className='text-xs'>
                        Online
                    </div>
                </div>
            </div>
            <div className="dropdown dropdown-end" onClick={()=>setChatSettingsModal(true)}>
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <Icon path={mdiDotsVertical} size={1}/>
                </label>
            </div>
        </div>
        <div className="divider"/>
        <div className='grow relative'>
            <Virtuoso
                className='no-scrollbar'
                totalCount={currentChatMessages.length}
                data={currentChatMessages}
                // initialTopMostItemIndex={currentChatMessages.length-1}
                atBottomStateChange={(bottom)=>{
                    setAtBottom(bottom)
                }}
                components={{
                    Header: VirtuosoCustomHeader
                }}
                ref={virtuosoRef}
                followOutput={'auto'}
                itemContent={(_idx, m) => 
                    <Tmessage 
                        message={m.message} 
                        // avatarUrl={""} 
                        // messageDirection={m.messageDirection} 
                        // messageStatus={m.messageStatus} 
                        // owner={m.owner}  
                        // sendDate={m.sendDate}
                    />
                }
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
                placeholder="Wpisz wiadomość" 
                className="input input-bordered input-primary w-full mr-5" 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e)=> e.key == "Enter" && onSendButtonPress()}
            />
            <button className="btn btn-primary" onClick={onSendButtonPress}>
                <Icon path={mdiSend} size={1} rotate={-20}/>
            </button>
        </div>

        <TchatSettingsModal isOpen={chatSettingsModal} closeCallback={()=>setChatSettingsModal(false)}/>
    </div>
    </>)
}