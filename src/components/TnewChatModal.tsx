



import { useState } from "react";
import { useAtom } from "jotai";

import { CreateChatPayload, createChat, initialCreateChatPayload} from "../api/chats/createChat"
import { cureentUserChatsAtom, currentUserAtom, currentUserFriendsListAtom } from "../stores/currentUserAtoms";
import { RequestStatus } from "../api/axios";


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

    const createNewChat = async () =>{
        if(currentUser == null) return;

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

        const resoult = await createChat(payload)

        if(resoult.status){
            setCurrentUserChats([...currentUserChats, resoult.data])
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
                <input type="text" placeholder="chat name" className="input input-bordered input-primary w-full" onInput={(e)=> setNewChatPayload({...newChatPayload, name: e.currentTarget.value})} />
            }
            </div>
            <div className="divider" />
            <div>
                <p>Chat members</p>
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
                <button className="btn btn-primary rounded-xl" onClick={()=>createNewChat()}>Create new chat</button>
            </div>
        </div>
    </dialog>
    )
}