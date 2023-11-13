



import { useState } from "react";
import { useAtom } from "jotai";

import { cureentUserChatsAtom, currentUserAtom, currentUserFriendsListAtom } from "../stores/currentUserAtoms";
import { RequestStatus, RequestResponseError } from "../api/axios";
import { CreateChatPayload, createChat, CreateChatRequestResponseError, initialCreateChatPayload} from "../api/chats/createChat"


export type TnewChatModalParams = {
    isOpen: boolean;
    closeCallback?: () => void
}

export const TnewChatModal = ({
    isOpen=false,
    closeCallback = () => {}
}:TnewChatModalParams) =>{

    const [currentUser, _setCurrentUser] = useAtom(currentUserAtom)
    const [currentUserFriendsList, setCurrentUserFriendsList] = useAtom(currentUserFriendsListAtom)
    const [currentUserChats, setCurrentUserChats] = useAtom(cureentUserChatsAtom)
    
    const [newChatPayload, setNewChatPayload] = useState<CreateChatPayload>(initialCreateChatPayload)


    const [createChatStatus, setUpdateChatNameStatus] = useState<RequestStatus>(RequestStatus.Idle)
    const [createChatError, setCreateChatError] = useState<RequestResponseError<CreateChatRequestResponseError>>(null)

    const createNewChat = async () =>{
        if(currentUser == null) return;
        setCreateChatError(null)


        if(newChatPayload.name == ""){
            setNewChatPayload(current => {
                const {name, ...rest} = current
                return rest
            })
        }

        const payload = {
            ...newChatPayload,
            chatMembers: [...newChatPayload.chatMembers, currentUser.id]
        }

        const resoult = await createChat(payload, setUpdateChatNameStatus)

        if(resoult.status){
            setCurrentUserChats([...currentUserChats, resoult.data])
        }
        else{
            setCreateChatError(resoult.responseError)
        }
    }

    return(
    <dialog className={`modal ${isOpen ? "modal-open" : "" }`}>
        <div className="modal-box w-11/12 max-w-3xl">
            <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2" onClick={() => closeCallback()}>X</button>
            <h3 className="font-bold text-lg">Create New Chat!</h3>
            <div className="divider" />
            <div>
            {
                newChatPayload.chatMembers.length > 1 && 
                <>
                    <input type="text" placeholder="chat name" className="input input-bordered input-primary w-full" onInput={(e)=> setNewChatPayload({...newChatPayload, name: e.currentTarget.value})} />
                    <span className="text-error">{createChatError?.message.name}</span>
                </>
            }
            </div>
            <div className="divider" />
            <div>
                <div>
                    <p>Chat members</p>
                    <p className="text-error">{createChatError?.message.chatMembers}</p>
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
                <p>Users</p>
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