

/*components*/
import { TmessagesContainer, SendMessageCallback } from "../components/TmessagesContainer"
import { TchatContainer, CreateNewChatCallback, SelectChatCallback, SearchCallback } from "../components/TchatContainer"
import { Tnavigation } from "../components/Tnavigation"
import { TfriendsContainer } from "../components/TfriendsContainer"

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
import { deleteChatMember } from "../api/chats/deleteChatMember"

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
    const [ChatSettingsModal, setChatSettingsModal] = useState(false)
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

    const fetchDeleteUser = async (chatId:number, userId:number) => {
        const resoult = await deleteChatMember({chatId: chatId, userId: userId})
    }

    const fetchAcceptInvite = async (userId:number) =>{

    }

    const fetchRejectInvite = async (userId:number) =>{

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

    const createNewChat = async () =>{
        if(newChatPayload.name == ""){
            setNewChatPayload(current => {
                const {name, ...rest} = current
                return rest
            })
        }
        const resoult = await createChat(newChatPayload)

        if(resoult.status){
            setCurrentUserChats([...currentUserChats, resoult.data])
        }
    }


    const onSelectChat:SelectChatCallback = async (chatId) =>{
        if(currentChatId == chatId) return;
        setCurrentChatId(chatId);
        fetchCurrentChatDetails();
        fetchCurrentChatMessages();
    }

    const searchChats:SearchCallback = (value) =>{
        console.log(value)
    }

    const MenuIemClickCallback = (itemName: string) =>{

    }

    return (<>
    <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2" onClick={() => setInvitesAcceptModal(true)}>invites</button>
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
                    <input type="text" placeholder="chat name" className="input input-bordered input-primary w-full" onInput={(e)=> setNewChatPayload({...newChatPayload, name: e.currentTarget.value})} />
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
                    <button className="btn btn-primary rounded-xl" onClick={()=>createNewChat()}>Create new chat</button>
                </div>
            </div>
        </dialog>

        <dialog className={`modal ${ChatSettingsModal ? "modal-open" : "" }`}>
            <div className="modal-box w-11/12 max-w-3xl">
                <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2" onClick={() => setChatSettingsModal(false)}>X</button>
                <h3 className="font-bold text-lg">Ustawienia Czatu</h3>
                <div className="divider" />
                <div className="ml-8">
                    Chat members
                    <div>
                        {currentChatDetails?.chatMembers.map(friend=><>
                        <div className="my-1">
                            <span>{friend.nickname}</span>
                            <button className="btn btn-sm btn-outline btn-primary ml-2" onClick={()=>fetchDeleteUser(currentChatDetails.id, friend.userId)}>Usuń z czatu</button>
                        </div>
                        </>)}
                    </div>
                    <div className="divider" />
                    <div>
                        {currentUserFriendsList.map(friend=><>
                            <div>
                                <span>{friend.firstName} {friend.lastName}</span>
                                <button className="btn btn-sm btn-outline btn-primary ml-2">Dodaj do czatu</button>
                            </div>
                        </>)}
                    </div>
                </div>
            </div>
        </dialog>

        <dialog className={`modal ${invitesAcceptModal ? "modal-open" : "" }`}>
            <div className="modal-box w-11/12 max-w-3xl">
                <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2" onClick={() => setInvitesAcceptModal(false)}>X</button>
                <h3>Zaproszenia</h3>
                {
                    currentUserFriendsInviteList.length > 0 
                    ? <div>
                        {currentUserFriendsInviteList.map(invite=><>
                            <div key={invite.friendId}>
                                <p>{invite.firstName}{invite.lastName}</p>
                                <button onClick={()=>fetchAcceptInvite(invite.friendId)}>Akceptuj zaproszenie</button>
                                <button onClick={()=>fetchRejectInvite(invite.friendId)}>Odrzuć zaproszenie</button>
                            </div>
                        </>)}
                    </div>
                    :<div className="text-2xl">
                        Obecnie nie masz rzadnych zaproszeń
                    </div>
                }
            </div>
        </dialog>

    </div>
    
    </>)
}