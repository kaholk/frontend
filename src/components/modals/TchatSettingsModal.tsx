
/*vvvvvvvvvv react*/
import { useState } from "react"
import { useNavigate } from "react-router-dom"
/*^^^^^^^^^^ react*/

/*vvvvvvvvvv jotai*/
import { useAtom } from "jotai"
/*^^^^^^^^^^ jotai*/

/*vvvvvvvvvv api*/
import { RequestStatus, RequestResponseError } from "../../api/axios"
import { ChatMember } from "../../api/types"
import { deleteChat, DeleteChatRequestError } from "../../api/chats/deleteChat"
import { addChatMember, AddChatMemberRequestError } from "../../api/chats/addChatMember"
import { deleteChatMember, DeleteChatMemberRequestError } from "../../api/chats/deleteChatMember"
import { changeChatName, ChangeChatNameRequestError } from "../../api/chats/changeChatName"
import { changeChatMemberNickname, ChangeChatMemberNicknameRequestError } from "../../api/chats/changeChatMemberNickname"
/*vvvvvvvvvv api*/

/*vvvvvvvvvv store*/
import { 
    // variables
    currentChatDetailsAtom, 
    friendsListAtom,
    currentChatIdAtom,
    userAtom,
    userChatsAtom,
} from "../../stores/currentUserAtoms"
/*^^^^^^^^^^ store*/

// modal params
export type TchatSettingsModalParams = {
    isOpen: boolean;
    closeCallback?: () => void
}

// chat settings modal
export const TchatSettingsModal = ({isOpen = true, closeCallback = () => {}}:TchatSettingsModalParams) =>{
    
    // navigate method, used to redirect
    const navigate = useNavigate();

    // store variables
    const [currentChatId, setCurrentChatId] = useAtom(currentChatIdAtom);
    const [currentChatDetails, setCurrentChatDetails] = useAtom(currentChatDetailsAtom);
    const [friendsList, _setFriendsList] = useAtom(friendsListAtom);
    const [currentUser, _setCurrentUser] = useAtom(userAtom);
    const [userChats, setUserChats] = useAtom(userChatsAtom);
    
    /*vvvvvvvvvv variables and methods used to track and trigger a request to delete chat*/
    const [deleteChatStatus, setDeleteChatStatus] = useState<RequestStatus>(RequestStatus.Idle);
    const [deleteChatError, setDeleteChatError] = useState<RequestResponseError<DeleteChatRequestError>>(null);
    const fetchDeleteChat = async () =>{

        // reset values
        setDeleteChatStatus(RequestStatus.Idle);
        setDeleteChatError(null);

         // if no chat is selected
        if(currentChatId == null){
            setAddChatMemberStatus(RequestStatus.Error);
            setAddChatMemberError({baseError: "nie wybrano czatu", error: null});
            return;
        }

        // try to delete chat
        const resoult = await deleteChat({id: currentChatId}, setDeleteChatStatus);

        // if error while deleting chat
        if(resoult.status == false){
            setDeleteChatError(resoult.data);
            return;
        }
        
        setUserChats(userChats.filter(chat=>chat.id != currentChatId));
        setCurrentChatId(null);
        closeCallback();

    }
    /*^^^^^^^^^^  variables and methods used to track and trigger a request to delete chat*/

    /*vvvvvvvvvv variables and methods used to track and trigger a request to add chat member*/
    const [addChatMemberStatus, setAddChatMemberStatus] = useState<RequestStatus>(RequestStatus.Idle);
    const [addChatMemberError, setAddChatMemberError] = useState<RequestResponseError<AddChatMemberRequestError>>(null);
    const [addChatMemberId, setAddChatMemberId] = useState<number | null>(null);
    const firendsListCanAddToChat = friendsList.filter(friend=> currentChatDetails?.chatMembers.every(chatMember=>chatMember.userId != friend.friendId));
    const fetchAddChatMember = async (userId: number) =>{

        // reset values
        setAddChatMemberStatus(RequestStatus.Idle);
        setAddChatMemberError(null);

        // initialize values
        setAddChatMemberId(userId);

        // if user is not login
        if(currentChatId == null){
            setAddChatMemberStatus(RequestStatus.Error);
            setAddChatMemberError({baseError: "użytkwnik nie jest zalogowany", error: null});
            return;
        }

        // if no chat is selected
        if(currentChatDetails == null){
            setAddChatMemberStatus(RequestStatus.Error);
            setAddChatMemberError({baseError: "nie wybrano czatu", error: null});
            return;
        }

        // try add chat member
        const resoult = await addChatMember({chatId: currentChatId, userId: userId}, setAddChatMemberStatus);

        // if error while adding chat member
        if(resoult.status == false){
            setAddChatMemberError(resoult.data);
            return;
        }

        // update chat details
        setCurrentChatDetails({...currentChatDetails, chatMembers: resoult.data});
    }
    /*^^^^^^^^^^ variables and methods used to track and trigger a request to add chat member*/

    /*vvvvvvvvvv variables and methods used to track and trigger a request to delete chat member*/
    const [deleteChatMemberStatus, setDeleteChatMemberStatus] = useState<RequestStatus>(RequestStatus.Idle);
    const [deleteChatMemberError, setDeleteChatMemberError] = useState<RequestResponseError<DeleteChatMemberRequestError>>(null);
    const [deleteChatMemberId, setDeleteChatMemberId] = useState<number | null>(null);
    const fetchDeleteChatMember = async (userId: number) =>{
        // reset values
        setDeleteChatMemberStatus(RequestStatus.Idle);
        setDeleteChatMemberError(null);

        // initialize values
        setDeleteChatMemberId(userId);

        // if no chat is selected
        if(currentChatId == null){
            setDeleteChatMemberStatus(RequestStatus.Error);
            setDeleteChatMemberError({baseError: "nie wybrano czatu", error: null});
            return;
        }

        // if no chat is selected
        if(currentChatDetails == null){
            setDeleteChatMemberStatus(RequestStatus.Error);
            setDeleteChatMemberError({baseError: "nie wybrano czatu", error: null});
            return;
        }

        // try delete caht member
        const resoult = await deleteChatMember({chatId: currentChatId, userId: userId}, setDeleteChatMemberStatus);

        // if error while deleting chat member
        if(resoult.status == false){
            setDeleteChatMemberError(resoult.data);
            return;
        }

        // update chat details
        setCurrentChatDetails({
            ...currentChatDetails,
            chatMembers: resoult.data
        })
    }
    /*^^^^^^^^^ variables and methods used to track and trigger a request to delete chat member*/

    /*vvvvvvvvvv variables and methods used to track and trigger a request to update the chat name*/
    const [newChatName, setNewChatName] = useState<string>("")
    const [updateChatNameStatus, setUpdateChatNameStatus] = useState<RequestStatus>(RequestStatus.Idle)
    const [updateChatNameError, setUpdateChatNameError] = useState<RequestResponseError<ChangeChatNameRequestError>>(null)
    const fetchUpdateChatName = async () =>{

        //reset values
        setUpdateChatNameStatus(RequestStatus.Idle);
        setUpdateChatNameError(null);

         // if no chat is selected
        if(currentChatId == null){
            setUpdateChatNameStatus(RequestStatus.Error);
            setUpdateChatNameError({baseError: "nie wybrano czatu", error: null});
            return;
        }

        // if chat is not multichat
        if(currentChatDetails?.multichat == false){
            setUpdateChatNameStatus(RequestStatus.Error);
            setUpdateChatNameError({baseError: "nie można zmienić nazwy czatu, ponieważ nie jest to multichat", error: null});
            return;
        }

        // try to update chat name
        const resoult = await changeChatName({chatId: currentChatId, name: newChatName}, setUpdateChatNameStatus);

        // if error while changing chat name
        if(resoult.status == false){
            setUpdateChatNameError(resoult.data)
            return;
        }

        
        setCurrentChatDetails(resoult.data)
        setNewChatName("");
    }
    /*^^^^^^^^^ variables and methods used to track and trigger a request to update the chat name*/

    /*vvvvvvvvvv variables and methods used to track and trigger a request to update chat member nickname*/
    const [newNickName, setNewNickName] = useState<string>("")
    const [selectedChatMember, setSelectedChatMember] = useState<ChatMember | null>(null)
    const [changeNickNameModal, setChangeNickNameModal] = useState<boolean>(false)
    const [changeNickNameStatus, setChangeNickNameStatus] = useState<RequestStatus>(RequestStatus.Idle)
    const [changeNickNameError, setChangeNickNameError] = useState<RequestResponseError<ChangeChatMemberNicknameRequestError>>(null)
    const fetchChangeChatMemberNickkname = async () =>{

        // reset values
        setChangeNickNameStatus(RequestStatus.Idle);
        setChangeNickNameError(null);

        // if no chat is selected
        if(currentChatId == null){
            setChangeNickNameStatus(RequestStatus.Error);
            setChangeNickNameError({baseError: "nie wybrano czatu", error: null});
            return;
        }

        // if no chat is selected
        if(currentChatDetails == null){
            setChangeNickNameStatus(RequestStatus.Error);
            setChangeNickNameError({baseError: "nie wybrano czatu", error: null});
            return;
        }

        // if no chat meber is selected
        if(selectedChatMember == null){
            setChangeNickNameStatus(RequestStatus.Error);
            setChangeNickNameError({baseError: "nie wybrano członka czatu", error: null});
            return;
        }

        // try change chatmember nickname
        const resoult = await changeChatMemberNickname({
            chatId: currentChatId,
            userId: selectedChatMember.userId,
            nickname: newNickName
        }, setChangeNickNameStatus);

        // if error while changing chat member nickname
        if(resoult.status == false){
            setChangeNickNameError(resoult.data);
            return;
        }

        // update values
        setCurrentChatDetails({
            ...currentChatDetails,
            chatMembers: resoult.data
        })
        setSelectedChatMember(resoult.data.filter(e=>e.userId == selectedChatMember.userId)[0])
    }
    const initializeChangeNickname = async (userId: number) =>{
        if(currentChatDetails == null) return;
        setNewNickName("")
        setSelectedChatMember(currentChatDetails.chatMembers.filter(e=>e.userId == userId)[0])
        setChangeNickNameModal(true);
    }
    /*^^^^^^^^^ variables and methods used to track and trigger a request to update chat member nickname*/

    // chat modal close diabled
    const chatModalDisabled = (
        (deleteChatStatus == RequestStatus.Pending) ||
        (addChatMemberStatus == RequestStatus.Pending) ||
        (deleteChatMemberStatus == RequestStatus.Pending) ||
        (updateChatNameStatus == RequestStatus.Pending) ||
        (changeNickNameStatus == RequestStatus.Pending)
    );
    
    // render mchat settings modal
    return(
        <dialog className={`modal ${isOpen ? "modal-open" : "" }`}>
        <div className="modal-box w-11/12 max-w-3xl"> 
            <button className={`btn btn-md btn-circle btn-ghost absolute right-2 top-2 ${chatModalDisabled && "btn-disabled"}`} onClick={() => closeCallback()}>X</button>
            <h3 className="font-bold text-lg">Ustawienia Czatu</h3>
            {/* multichat check */}
            Mulichat: {currentChatDetails?.multichat}
            <div className="divider"/>
            {
                currentChatDetails?.multichat == true &&
                <>
                <div>
                    <h4 className="font-bold text-md">Nazwa czatu</h4>
                    <div className="ml-8">
                        <div>Obecna nazwa: {currentChatDetails?.name}</div>
                        <div>
                            Nowa nazwa: 
                            <input type="text" className="input input-xs input-primary" value={newChatName} onInput={(e)=>setNewChatName(e.currentTarget.value)}/> 
                            {newChatName.length > 3 && <button className="btn btn-sm btn-outline btn-primary ml-2" onClick={()=>fetchUpdateChatName()}>Zmień nazwe czatu</button>}
                        </div>
                        {updateChatNameStatus == RequestStatus.Error  && <span className="text-error">{updateChatNameError?.baseError}</span>}
                    </div>
                </div>
                <div className="divider" />
                </>
            }
            <div>
                <h4 className="font-bold text-md">Członkowie czatu</h4>
                <div className="ml-8">
                    {currentChatDetails?.chatMembers.map(chatMember=>
                    <div className="my-1" key={chatMember.userId}>
                        <span>{chatMember.nickname} ({chatMember.userId})</span>
                        {
                            chatMember.userId == currentUser?.id 
                            ?
                            <span>(Ty)</span>
                            :
                            <>
                                <button className={`btn btn-sm btn-outline btn-primary ml-2 ${deleteChatMemberStatus == RequestStatus.Pending && "btn-disabled"}`} onClick={()=>fetchDeleteChatMember(chatMember.userId)}>
                                    {(deleteChatMemberStatus == RequestStatus.Pending && chatMember.userId == deleteChatMemberId) && <span className="loading loading-spinner"/>}
                                    Usuń z czatu
                                </button>
                                {(deleteChatMemberStatus == RequestStatus.Error && chatMember.userId == deleteChatMemberId) && <span className="text-error">{deleteChatMemberError?.baseError}</span>}
                                <button className={`btn btn-sm btn-outline btn-primary ml-2`} onClick={()=>initializeChangeNickname(chatMember.userId)}>
                                    Zmień nick
                                </button>
                            </>
                        }
                    </div>
                    )}
                </div>
                <div className="divider" />
                <div>
                    <h4 className="font-bold text-md">Dodaj znajomych do czatu</h4>
                    {
                        firendsListCanAddToChat.length == 0
                        ? <span className="text-primary cursor-pointer" onClick={()=>{closeCallback(); navigate("/friends");}}>Zaproś więcej znajomych</span>
                        :
                        <div className="ml-8">
                            {
                            firendsListCanAddToChat.map(friend=>
                            <div key={friend.friendId}>
                                <span>{friend.firstName} {friend.lastName} ({friend.friendId})</span>
                                <button className={`btn btn-sm btn-outline btn-primary ml-2 ${addChatMemberStatus == RequestStatus.Pending && "btn-disabled"}`} onClick={()=>fetchAddChatMember(friend.friendId)}>
                                    {(addChatMemberStatus == RequestStatus.Pending && friend.friendId == addChatMemberId) && <span className="loading loading-spinner"/>}
                                    Dodaj do czatu
                                </button>
                                {(addChatMemberStatus == RequestStatus.Error && friend.friendId == addChatMemberId) && <span className="text-error">{addChatMemberError?.baseError}</span>}
                            </div>
                            )}
                        </div>
                    }
                </div>
                <div className="divider" />
                <button className={`btn btn-sm btn-outline btn-primary ml-2 ${deleteChatStatus == RequestStatus.Pending && "btn-disabled"}`} onClick={()=>fetchDeleteChat()}>
                    {(deleteChatStatus == RequestStatus.Pending) && <span className="loading loading-spinner"/>}
                    Usuń czat
                </button>
                <span className="text-error">{deleteChatError?.baseError}</span>
            </div>
        </div>
        <dialog className={`modal ${changeNickNameModal ? "modal-open" : "" }`}>
            <div className="modal-box w-11/12 max-w-3xl">
                <button className={`btn btn-md btn-circle btn-ghost absolute right-2 top-2 ${changeNickNameStatus == RequestStatus.Pending && "btn-disabled"}`} onClick={() => setChangeNickNameModal(false)}>X</button>
                <h3 className="font-bold text-md mb-2">Zmień pseudonim</h3>

                <div>Obecny nick: {selectedChatMember?.nickname}</div>
                <div>
                    Nowy nick: <input type="text" className="input input-xs input-primary" value={newNickName} onInput={(e)=>setNewNickName(e.currentTarget.value)}/> 
                    {newNickName.length > 3 && <button className={`btn btn-sm btn-outline btn-primary ml-2 ${changeNickNameStatus == RequestStatus.Pending}`} onClick={()=>fetchChangeChatMemberNickkname()}>
                        Zapisz zmiany
                        {changeNickNameStatus == RequestStatus.Pending && <span className="loading loading-spinner"/>}
                    </button>}
                </div>
                {
                    changeNickNameStatus == RequestStatus.Error &&
                    <div className="text-error">
                        {changeNickNameError?.baseError}
                        {changeNickNameError?.error?.message.nickname}
                    </div>
                }
            </div>
        </dialog>
    </dialog>
    )


}

