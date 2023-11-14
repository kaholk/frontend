

/*components*/
import { TmessagesContainer, SendMessageCallback } from "../components/TmessagesContainer"
import { TchatContainer, SelectChatCallback, SearchCallback } from "../components/TchatContainer"
import { Tnavigation } from "../components/Tnavigation"
import { TfriendsContainer } from "../components/TfriendsContainer"
import { TchatSettingsModal } from "../components/TchatSettingsModal"
import { TnewChatModal } from "../components/TnewChatModal"

import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useAtom } from "jotai"


import { 
    userAtom, 
    userChatsAtom, 
    currentChatDetailsAtom, 
    currentChatIdAtom, 
    currentChatMessagesAtom,
    currentUserFriendsInviteListAtom,
    currentUserFriendsListAtom,
    userChatsRequestStatusAtom,
    // fetchUserChats,
} from "../stores/currentUserAtoms"

/*api methods*/
import { getUserChats } from "../api/chats/getUserChats"
import { getMessages } from "../api/messages/getMessages"
import { getChatDetails } from "../api/chats/getChatDetails"
import { getFriendsList } from "../api/friends/getFriendsList"
import { getFirendsInvitesList } from "../api/friends/getFriendsInvitesList"



export const ChatsPage = () =>{
    const navigate = useNavigate()
    const currentURL = window.location.pathname

    const [currentUser, _setCurrentUser] = useAtom(userAtom)
    const [currentUserChats, setCurrentUserChats] = useAtom(userChatsAtom)

    const [currentChatId, setCurrentChatId] = useAtom(currentChatIdAtom)
    const [_currentChatDetails, setCurrentChatDetails] = useAtom(currentChatDetailsAtom)
    const [_currentChatMessages, setCurrentChatMessages] = useAtom(currentChatMessagesAtom)
    const [_currentUserFriendsInviteList, setCurrentUserFriendsInviteList] = useAtom(currentUserFriendsInviteListAtom)
    const [_currentUserFriendsList, setCurrentUserFriendsList] = useAtom(currentUserFriendsListAtom)
    const [newChatModal, setNewChatModal] = useState(false)
    

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

    const onSelectChat:SelectChatCallback = (chatId) =>{
        if(currentChatId == chatId) return;
        setCurrentChatId(chatId);
    }

    const searchChats:SearchCallback = (value) =>{
        console.log(value)
    }

    useEffect(()=>{
        if(currentUser == null){
            navigate("/");
            return;
        }
        // fetchUserChats()
        fetchUserChats()
        fetchUserFreindsList()
        fetchUserFriendInviteList()
    }, [])
    
    useEffect(()=>{
        if(currentChatId == null) return;
        // fetchUserChats()
        fetchUserChats()
        fetchCurrentChatDetails()
        fetchCurrentChatMessages()
    },[currentChatId])


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
            <TmessagesContainer />
        </div>

        <TnewChatModal isOpen={newChatModal} closeCallback={()=>setNewChatModal(false)}/>
        
    </div>
    
    </>)
}