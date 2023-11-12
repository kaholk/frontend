
import { useAtom } from "jotai"
import { useState } from "react"


import { 
    currentChatDetailsAtom, 
    currentUserFriendsListAtom,
    currentChatIdAtom
} from "../stores/currentUserAtoms"

import { RequestStatus } from "../api/axios"

import { deleteChat } from "../api/chats/deleteChat"
import { addChatMember } from "../api/chats/addChatMember"
import { deleteChatMember } from "../api/chats/deleteChatMember"


export type TchatSettingsModalParams = {
    isOpen: boolean;
    closeCallback?: () => void
}

export const TchatSettingsModal = ({
        isOpen = true,
        closeCallback = () => {}
    }:TchatSettingsModalParams) =>{

    const [currentChatId, setCurrentChatId] = useAtom(currentChatIdAtom)
    const [currentChatDetails, setCurrentChatDetails] = useAtom(currentChatDetailsAtom)
    const [currentUserFriendsList, setCurrentUserFriendsList] = useAtom(currentUserFriendsListAtom)

    const [deleteChatStatus, setDeleteChatStatus] = useState<RequestStatus>(RequestStatus.Idle)
    const [addChatMemberStatus, setAddChatMemberStatus] = useState<RequestStatus>(RequestStatus.Idle)
    const [deleteChatMemberStatus, setDeleteChatMemberStatus] = useState<RequestStatus>(RequestStatus.Idle)
    
    const fetchAddChatMember = async (userId: number) =>{
        if(currentChatId == null) return;
        if(currentChatDetails == null) return;

        const resoult = await addChatMember({chatId: currentChatId, userId: userId});
        if(resoult.status){
            setCurrentChatDetails({...currentChatDetails, chatMembers: resoult.data})
        }
    }

    const fetchDeleteChatMember = async (userId: number) =>{
        if(currentChatId == null) return;
        const resoult = await deleteChatMember({chatId: currentChatId, userId: userId});
    }

    const fetchDeleteChat = async () =>{
        if(currentChatId == null) return;
        const resoult = deleteChat({id: currentChatId}, setDeleteChatStatus);
    }
    
    return <>
          <dialog className={`modal ${isOpen ? "modal-open" : "" }`}>
            <div className="modal-box w-11/12 max-w-3xl"> 
                <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2" onClick={() => closeCallback()}>X</button>
                <h3 className="font-bold text-lg">Ustawienia Czatu</h3>
                <div className="divider" />
                <div className="ml-8">
                    <div>
                        Chat members
                        {currentChatDetails?.chatMembers.map(friend=><>
                        <div className="my-1">
                            <span>{friend.nickname} ({friend.userId})</span>
                            <button className="btn btn-sm btn-outline btn-primary ml-2" onClick={()=>fetchDeleteChatMember(friend.userId)}>Usuń z czatu</button>
                        </div>
                        </>)}
                    </div>
                    <div className="divider" />
                    <div>
                        Znajomi
                        {currentUserFriendsList.filter(firend=> currentChatDetails?.chatMembers.every(e=>e.userId != firend.friendId)).map(friend=>
                            <div key={friend.friendId}>
                                <span>{friend.firstName} {friend.lastName} ({friend.friendId})</span>
                                {
                                    <button className="btn btn-sm btn-outline btn-primary ml-2" onClick={()=>fetchAddChatMember(friend.friendId)}>Dodaj do czatu</button>
                                }
                            </div>
                        )}
                    </div>
                    <div className="divider" />
                    <button className="btn btn-sm btn-outline btn-primary ml-2" onClick={()=>fetchDeleteChat()}>Usuń czat</button>
                </div>
            </div>
        </dialog>
    </>


}

