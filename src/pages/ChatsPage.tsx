
/*vvvvvvvvvv react*/
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
/*^^^^^^^^^^ react*/

/*vvvvvvvvvv jotai*/
import { useAtom } from "jotai"
/*^^^^^^^^^^ jotai*/


/*vvvvvvvvvv components*/
import { Tnavigation } from "../components/other/Tnavigation"
import { TfriendsContainer } from "../components/containers/TfriendsContainer"
import { TchatContainer } from "../components/containers/TchatContainer"
import { TsettingsContainer } from "../components/containers/TsettingsContainer"
import { TmessagesContainer } from "../components/containers/TmessagesContainer"
/*^^^^^^^^^^ components*/

/*vvvvvvvvvv import store*/
import { 
    // variables
    userAtom, 
    currentChatIdAtom,
    currentChatDetailsAtom,

    // methods
    fetchUserChats,
    fetchFriendsList,
    fetchCurrentChatDetails,
    fetchCurrentChatMessages,
    fetchFriendsInviteList
} from "../stores/currentUserAtoms"
/*^^^^^^^^^^ import store*/

// chats page component
export const ChatsPage = () =>{
    
    // navigate method, used to redirect
    const navigate = useNavigate()

    // current url path, neded to conditional render
    const currentURL = window.location.pathname

    // store variables
    const [currentUser, _setCurrentUser] = useAtom(userAtom)
    const [currentChatId, _setCurrentChatId] = useAtom(currentChatIdAtom)
    const [_chatDetials, setChatDetials] = useAtom(currentChatDetailsAtom)

    // download user chats, friends and invites on first render
    useEffect(()=>{
        if(currentUser == null){
            navigate("/");
            return;
        }
        fetchUserChats();
        fetchFriendsList();
        fetchFriendsInviteList();
    }, [])
    
    // download user chats, chat details and chats messages when chat id has changed
    useEffect(()=>{
        if(currentChatId == null){
            setChatDetials(null);
            return;
        }
        fetchUserChats();
        fetchCurrentChatDetails();
        fetchCurrentChatMessages();
    },[currentChatId])


    return (
    <div className="flex flex-row justify-between p-4 h-full">
        <div className="flex flex-col h-full w-1/3 mr-4">
            <Tnavigation/>
            <br />
            { currentURL == "/chats" && <TchatContainer /> }
            { currentURL == "/friends" && <TfriendsContainer />}
            { currentURL == "/settings" && <TsettingsContainer />}
        </div>
        <div className="flex flex-col h-full grow">
            <TmessagesContainer />
        </div>
    </div>
    )
}