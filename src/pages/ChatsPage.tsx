

/*components*/
import { TmessagesContainer, SendMessageCallback } from "../components/TmessagesContainer"
import { TchatContainer, CreateNewChatCallback, SelectChatCallback, SearchCallback } from "../components/TchatContainer"
import { Tnavigation } from "../components/Tnavigation"

import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useAtom } from "jotai"


import { 
    currentUserAtom, 
    cureentUserChatsAtom, 
    currentChatDetailsAtom, 
    currentChatIdAtom, 
    currentChatMessagesAtom,
    currentUserFriendsInviteListAtom,
    currentUserFriendsListAtom
} from "../stores/currentUserAtoms"

/*api methods*/
import { getUserChats } from "../api/chats/getUserChats"
import { getMessages } from "../api/messages/getMessages"
import { getChatDetails } from "../api/chats/getChatDetails"
import { sendMessage } from "../api/messages/sendMessage"
import { getFriendsList } from "../api/friends/getFriendsList"
import { getFirendsInvitesList } from "../api/friends/getFriendsInvitesList"
import { CreateChatPayload, initialCreateChatPayload } from "../api/chats/createChat"

export const ChatsPage = () =>{
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom)
    const [currentUserChats, setCurrentUserChats] = useAtom(cureentUserChatsAtom)

    const [currentChatId, setCurrentChatId] = useAtom(currentChatIdAtom)
    const [currentChatDetails, setCurrentChatDetails] = useAtom(currentChatDetailsAtom)
    const [currentChatMessages, setCurrentChatMessages] = useAtom(currentChatMessagesAtom)
    const [currentUserFriendsInviteList, setCurrentUserFriendsInviteList] = useAtom(currentUserFriendsInviteListAtom)
    const [currentUserFriendsList, setCurrentUserFriendsList] = useAtom(currentUserFriendsListAtom)

    const [newChatPayload, setNewChatPayload] = useState<CreateChatPayload>(initialCreateChatPayload)



    const fetchUserChats = async () =>{
        if(currentUser == null) return;
        const resoult = await getUserChats({id: currentUser.id})
        if(resoult.status == false){
            // show error
            return;
        }
        setCurrentUserChats(resoult.data)
        if(resoult.data.length > 0)
            setCurrentChatId(resoult.data[0].id)
    }

    const fetchUserFreindsList = async () =>{
        if(currentUser == null) return;
        const resoult = await getFriendsList({id: currentUser.id})
        if(resoult.status == false){
            // show error
            return;
        }
        setCurrentUserFriendsList(resoult.data)
    }

    const fetchUserFriendInviteList = async () =>{
        if(currentUser == null) return;
        const resoult = await getFirendsInvitesList({id: currentUser.id})
        if(resoult.status == false){
            // show error
            return;
        }
        setCurrentUserFriendsInviteList(resoult.data)
    }

    const fetchCurrentChatDetails = async () =>{
        if(currentChatId == null) return;

        const resoultChatDetails = await getChatDetails({id: currentChatId})
        if(resoultChatDetails.status){
            setCurrentChatDetails(resoultChatDetails.data)
        }
    }

    const fetchCurrentChatMessages = async () =>{
        if(currentChatId == null) return;

        const resoultMessages = await getMessages({id: currentChatId})
        if(resoultMessages.status){
            setCurrentChatMessages(resoultMessages.data)
        }

    }

    useEffect(()=>{
        if(currentUser == null){
            navigate("/");
            return;
        }
        fetchUserChats()
        fetchUserFreindsList()
        fetchUserFriendInviteList()
    }, [])

    useEffect(()=>{
        // getMessages({id: })
    },[currentChatId])



    const [newChatModal, setNewChatModal] = useState(false)

    const sendNewMessage:SendMessageCallback = async (newMessage) =>{
        console.log(newMessage)

        if((currentChatDetails == null) || (currentUser == null)) return;

        const sendMessageResoult = await sendMessage({
            chatId: currentChatDetails.id,
            userId: currentUser.id,
            message: newMessage
        })

        if(sendMessageResoult.status){
            
        }

    }

    const onSelectChat:SelectChatCallback = async (chatId) =>{
        if(currentChatId == chatId) return;
        setCurrentChatId(chatId);
        fetchCurrentChatDetails();
        fetchCurrentChatMessages();
    }

    const createNewChat:CreateNewChatCallback = () =>{
        setNewChatModal(true)
    }

    const searchChats:SearchCallback = (value) =>{
        console.log(value)
    }

    return (<>
    <div className="flex flex-row justify-between p-4 h-full">
        <div className="flex flex-col h-full w-1/3 mr-4">
            <Tnavigation />
            <br />
            <TchatContainer chats={currentUserChats} currentChatId={0} createNewChatCallback={createNewChat} selectChatCallback={onSelectChat} searchCallback={searchChats}/>
        </div>
        <div className="flex flex-col h-full grow">
            <TmessagesContainer messages={currentChatMessages} /*avatarUrl={currentChat?.avatarUrl}*/ chatName={currentChatDetails?.name} sendMessageCallback={sendNewMessage}/>
        </div>
        <dialog className={`modal ${newChatModal ? "modal-open" : "" }`}>
            <div className="modal-box w-11/12 max-w-3xl">
                <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2" onClick={() => setNewChatModal(false)}>X</button>
                <h3 className="font-bold text-lg">Create New Chat!</h3>
                <div className="divider" />
                <div>
                    <input type="text" placeholder="chat name" className="input input-bordered input-primary w-full" />
                </div>
                <div className="divider" />
                <div>
                    <p>Chat members</p>
                    {currentUserFriendsList.filter(e=> newChatPayload.chatMembers.some(ee=>ee == e.friendId)).map(firend=> <>
                        <div key={firend.friendId}>
                            {firend.firstName} {firend.lastName}
                            <button className="btn btn-sm btn-primary" onClick={()=>setNewChatPayload({
                                ...newChatPayload,
                                chatMembers: newChatPayload.chatMembers.filter(e=>e != firend.friendId)
                            })}>-</button>
                        </div>
                    </>)}
                </div>
                <div className="divider" />
                <div>
                    <p>Users</p>
                    {currentUserFriendsList.filter(e=> newChatPayload.chatMembers.every(ee=>ee != e.friendId)).map(firend=> <>
                        <div key={firend.friendId}>
                            {firend.firstName} {firend.lastName}
                            <button className="btn btn-sm btn-primary" onClick={()=> setNewChatPayload({
                                ...newChatPayload,
                                chatMembers: [...newChatPayload.chatMembers, firend.friendId]
                            })}>+</button>
                        </div>
                    </>)}
                </div>
                <div className="divider" />
                <div className="modal-action">
                    <button className="btn btn-primary rounded-xl">Create new chat</button>
                </div>
            </div>
        </dialog>
    </div>
    
    </>)
}