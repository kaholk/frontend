

/*components*/
import { TmessagesContainer, SendMessageCallback } from "../components/TmessagesContainer"
import { TchatContainer, SelectChatCallback, SearchCallback } from "../components/TchatContainer"
import { Tnavigation } from "../components/Tnavigation"
import { TfriendsContainer } from "../components/TfriendsContainer"
import { TchatSettingsModal } from "../components/TchatSettingsModal"

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
import { createChat, CreateChatPayload, initialCreateChatPayload } from "../api/chats/createChat"

export const ChatsPage = () =>{
    const navigate = useNavigate()
    const currentURL = window.location.pathname

    const [currentUser, setCurrentUser] = useAtom(currentUserAtom)
    const [currentUserChats, setCurrentUserChats] = useAtom(cureentUserChatsAtom)

    const [currentChatId, setCurrentChatId] = useAtom(currentChatIdAtom)
    const [currentChatDetails, setCurrentChatDetails] = useAtom(currentChatDetailsAtom)
    const [currentChatMessages, setCurrentChatMessages] = useAtom(currentChatMessagesAtom)
    const [currentUserFriendsInviteList, setCurrentUserFriendsInviteList] = useAtom(currentUserFriendsInviteListAtom)
    const [currentUserFriendsList, setCurrentUserFriendsList] = useAtom(currentUserFriendsListAtom)

    const [newChatPayload, setNewChatPayload] = useState<CreateChatPayload>(initialCreateChatPayload)

    const [newChatModal, setNewChatModal] = useState(false)
    const [chatSettingsModal, setChatSettingsModal] = useState(false)
    const [invitesAcceptModal, setInvitesAcceptModal] = useState(false)

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
        // console.log(`currentchatDetails chat ${currentChatId}`)

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

    // useEffect(()=>{
    //     if(currentChatId != null)
    //         fetchCurrentChatDetails()
    // },[currentChatId])


    const sendNewMessage:SendMessageCallback = async (newMessage) =>{
        console.log(newMessage)

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

    }

    const createNewChat = async () =>{
        if(currentUser == null) return;

        if(newChatPayload.name == ""){
            setNewChatPayload(current => {
                const {name, ...rest} = current
                return rest
            })
        }

        console.log(newChatPayload.chatMembers)
        const payload = {
            ...newChatPayload,
            chatMembers: [...newChatPayload.chatMembers, currentUser.id]
        }

        const resoult = await createChat(payload)

        if(resoult.status){
            setCurrentUserChats([...currentUserChats, resoult.data])
        }
    }


    const onSelectChat:SelectChatCallback = (chatId) =>{
        if(currentChatId == chatId) return;
        // console.log(currentChatId)
        setCurrentChatId(chatId);
        // console.log(`select chat ${currentChatId}`)
        fetchCurrentChatDetails();
        fetchCurrentChatMessages();
    }

    const searchChats:SearchCallback = (value) =>{
        console.log(value)
    }


    return (<>
    <div className="flex flex-row justify-between p-4 h-full">
        <div className="flex flex-col h-full w-1/3 mr-4">
            <Tnavigation/>
            <br />
            {
            currentURL == "/chats" &&
            <TchatContainer chats={currentUserChats} currentChatId={0} createNewChatCallback={()=>setNewChatModal(true)} selectChatCallback={onSelectChat} searchCallback={searchChats}/>
            }
            {
                currentURL == "/friends" &&
                <TfriendsContainer />
            }
            
        </div>
        <div className="flex flex-col h-full grow">
            <TmessagesContainer messages={currentChatMessages} /*avatarUrl={currentChat?.avatarUrl}*/ chatName={currentChatDetails?.name} sendMessageCallback={sendNewMessage} clickChatSettingsCallback={()=>setChatSettingsModal(true)}/>
        </div>
        <dialog className={`modal ${newChatModal ? "modal-open" : "" }`}>
            <div className="modal-box w-11/12 max-w-3xl">
                <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2" onClick={() => setNewChatModal(false)}>X</button>
                <h3 className="font-bold text-lg">Create New Chat!</h3>
                <div className="divider" />
                <div>
                    {
                        newChatPayload.chatMembers.length > 1 &&
                        <input type="text" placeholder="chat name" className="input input-bordered input-primary w-full" onInput={(e)=> setNewChatPayload({...newChatPayload, name: e.currentTarget.value})} />
                    }
                </div>
                <div className="divider" />
                <div>
                    <p>Chat members</p>
                    {currentUser?.firstName} {currentUser?.lastName} (Ty)
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
                            {firend.firstName} {firend.lastName} ({firend.friendId})
                            <button className="btn btn-sm btn-primary" onClick={()=> setNewChatPayload({
                                ...newChatPayload,
                                chatMembers: [...newChatPayload.chatMembers, firend.friendId]
                            })}>+</button>
                        </div>
                    </>)}
                </div>
                <div className="divider" />
                <div className="modal-action">
                    <button className="btn btn-primary rounded-xl" onClick={()=>createNewChat()}>Create new chat</button>
                </div>
            </div>
        </dialog>

        <TchatSettingsModal isOpen={chatSettingsModal} closeCallback={()=>setChatSettingsModal(false)}/>
    </div>
    
    </>)
}