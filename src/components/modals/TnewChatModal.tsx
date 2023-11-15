

/*vvvvvvvvvv react*/
import { useState } from "react"
/*^^^^^^^^^^ react*/

/*vvvvvvvvvv jotai*/
import { useAtom } from "jotai"
/*^^^^^^^^^^ jotai*/

/*vvvvvvvvvv api*/
import { RequestStatus, RequestResponseError } from "../../api/axios";
import { CreateChatPayload, createChat, CreateChatRequestError, initialCreateChatPayload} from "../../api/chats/createChat"
/*vvvvvvvvvv api*/

/*vvvvvvvvvv store*/
import { userChatsAtom, userAtom, friendsListAtom, currentChatIdAtom } from "../../stores/currentUserAtoms";
/*^^^^^^^^^^ store*/

// modal params
export type TnewChatModalParams = {
    isOpen: boolean;
    closeCallback?: () => void
}

// new chat modal
export const TnewChatModal = ({
    isOpen=false,
    closeCallback = () => {}
}:TnewChatModalParams) =>{

    // store variables
    const [currentUser, _setCurrentUser] = useAtom(userAtom);
    const [currentUserFriendsList, _setCurrentUserFriendsList] = useAtom(friendsListAtom);
    const [currentUserChats, setCurrentUserChats] = useAtom(userChatsAtom);
    const [_currentChatId, setCurrentChatId] = useAtom(currentChatIdAtom);
    
    /*vvvvvvvvvv variables and methods used to track and trigger a request to create new chat*/
    const [newChatPayload, setNewChatPayload] = useState<CreateChatPayload>(initialCreateChatPayload);
    const [createChatStatus, setUpdateChatNameStatus] = useState<RequestStatus>(RequestStatus.Idle);
    const [createChatError, setCreateChatError] = useState<RequestResponseError<CreateChatRequestError>>(null);
    const createNewChat = async () =>{

        // reset values
        setUpdateChatNameStatus(RequestStatus.Idle);
        setCreateChatError(null);

        // if user is not login
        if(currentUser == null){
            setUpdateChatNameStatus(RequestStatus.Error);
            setCreateChatError({baseError: "użytkwnik nie jest zalogowany", error: null});
            return;
        }

        // create payload to create new chat
        const payload = {
            ...(newChatPayload.name != "" && {name: newChatPayload.name}),
            chatMembers: [...newChatPayload.chatMembers, currentUser.id]
        };

        // try to create new chat
        const resoult = await createChat(payload, setUpdateChatNameStatus);

        // if error while creating new chat
        if(resoult.status == false){
            setCreateChatError(resoult.data);
            return;
        }

        // update values
        setCurrentUserChats([...currentUserChats, {
            id: resoult.data.id,
            lastMessage: "",
            lastMessageNickname: "",
            name: `${currentUser.firstName} ${currentUser.lastName}`
        }]);
        setCurrentChatId(resoult.data.id)
        closeCallback();
    }
    /*^^^^^^^^^^ variables and methods used to track and trigger a request to create new chat*/


    return(
    <dialog className={`modal ${isOpen ? "modal-open" : "" }`}>
        <div className="modal-box w-11/12 max-w-3xl">
            <button className={`btn btn-md btn-circle btn-ghost absolute right-2 top-2 ${createChatStatus == RequestStatus.Pending && "btn-disabled"}`} onClick={() => closeCallback()}>X</button>
            <h3 className="font-bold text-lg">Utwórz nowy Chat!</h3>
            <div className="divider" />
            <div>
            {
                newChatPayload.chatMembers.length > 1 && 
                <>
                    <input type="text" placeholder="chat name" className="input input-bordered input-primary w-full" onInput={(e)=> setNewChatPayload({...newChatPayload, name: e.currentTarget.value})} />
                    <span className="text-error">{createChatError?.error?.message.name}</span>
                    <div className="divider" />
                </>
            }
            </div>
            <div>
                <div>
                    <p>Chat members</p>
                    <p className="text-error">{createChatError?.error?.message.chatMembers}</p>
                </div>
                {currentUser?.firstName} {currentUser?.lastName} (Ty)
                {
                    currentUserFriendsList.filter(e=> newChatPayload.chatMembers.some(ee=>ee == e.friendId)).map(firend=>
                    <div key={firend.friendId}>
                        {firend.firstName} {firend.lastName}
                        <button className="btn btn-sm btn-primary" onClick={()=>setNewChatPayload({...newChatPayload, chatMembers: newChatPayload.chatMembers.filter(e=>e != firend.friendId)})}>-</button>
                    </div>
                )}
            </div>
            <div className="divider" />
            <div>
                <p>Dodaj znojomych do czatu</p>
                {currentUserFriendsList.filter(e=> newChatPayload.chatMembers.every(ee=>ee != e.friendId)).map(firend=>
                    <div key={firend.friendId}>
                        {firend.firstName} {firend.lastName} ({firend.friendId})
                        <button className="btn btn-sm btn-primary" onClick={()=> setNewChatPayload({...newChatPayload, chatMembers: [...newChatPayload.chatMembers, firend.friendId]})}>+</button>
                    </div>
                )}
            </div>
            <div className="divider" />
            <div className="modal-action">
                <button className={`btn btn-primary rounded-xl ${createChatStatus == RequestStatus.Pending && "btn-disabled"}`} onClick={()=>createNewChat()}>
                    {createChatStatus == RequestStatus.Pending && <span className="loading loading-spinner"/> }
                    Create new chat
                </button>
            </div>
        </div>
    </dialog>
    )
}