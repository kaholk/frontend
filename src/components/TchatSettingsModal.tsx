
import { useAtom } from "jotai"
import { useState } from "react"


import { 
    currentChatDetailsAtom, 
    currentUserFriendsListAtom,
    currentChatIdAtom
} from "../stores/currentUserAtoms"

import { ChatMember } from "../api/types"

import { RequestStatus } from "../api/axios"

import { deleteChat } from "../api/chats/deleteChat"
import { addChatMember } from "../api/chats/addChatMember"
import { deleteChatMember } from "../api/chats/deleteChatMember"
import { changeChatName } from "../api/chats/changeChatName"
import { changeChatMemberNickname } from "../api/chats/changeChatMemberNickname"


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

    const [newChatName, setNewChatName] = useState<string>("")

    const [changeNickNameModal, setChangeNickNameModal] = useState<boolean>(false)
    const [newNickName, setNewNickName] = useState<string>("")
    const [selectedChatMember, setSelectedChatMember] = useState<ChatMember | null>(null)
    
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
        if(currentChatDetails == null) return;
        const resoult = await deleteChatMember({chatId: currentChatId, userId: userId});

        if(resoult.status){
            setCurrentChatDetails({
                ...currentChatDetails,
                chatMembers: resoult.data
            })
        }
    }

    const fetchDeleteChat = async () =>{
        if(currentChatId == null) return;
        const resoult = deleteChat({id: currentChatId}, setDeleteChatStatus);
    }

    const fetchUpdateChatName = async () =>{
        if(currentChatId == null) return;

        const resoult = await changeChatName({chatId: currentChatId, name: newChatName})
        if(resoult.status){
            setCurrentChatDetails(resoult.data)
            setNewChatName("");
        }
    }



    const initializeChangeNickname = async (userId: number) =>{
        if(currentChatDetails == null) return;
        setNewNickName("")
        setSelectedChatMember(currentChatDetails.chatMembers.filter(e=>e.userId == userId)[0])
        setChangeNickNameModal(true);
    }

    const fetchChangeChatMemberNickkname = async () =>{
        if(currentChatId == null) return;
        if(selectedChatMember == null) return;
        if(currentChatDetails == null) return;

        const resoult = await changeChatMemberNickname({
            chatId: currentChatId,
            userId: selectedChatMember.userId,
            nickname: newNickName
        })

        if(resoult.status){
            setCurrentChatDetails({
                ...currentChatDetails,
                chatMembers: resoult.data
            })
            setSelectedChatMember(resoult.data.filter(e=>e.userId == selectedChatMember.userId)[0])
        }
    }
    
    return <>
          <dialog className={`modal ${isOpen ? "modal-open" : "" }`}>
            <div className="modal-box w-11/12 max-w-3xl"> 
                <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2" onClick={() => closeCallback()}>X</button>
                <h3 className="font-bold text-lg">Ustawienia Czatu</h3>
                <div className="divider" />
                <div>
                    <h4 className="font-bold text-md">Nazwa czatu</h4>
                    <div className="ml-8">
                        <div>Obecna nazwa: {currentChatDetails?.name}</div>
                        <div>
                            Nowa nazwa: 
                            <input type="text" className="input input-xs input-primary" value={newChatName} onInput={(e)=>setNewChatName(e.currentTarget.value)}/> 
                            {newChatName.length > 3 && <button className="btn btn-sm btn-outline btn-primary ml-2" onClick={()=>fetchUpdateChatName()}>Zmień nazwe czatu</button>}
                        </div>
                    </div>
                </div>
                <div className="divider" />
                <div>
                    <h4 className="font-bold text-md">Członkowie czatu</h4>
                    <div className="ml-8">
                        {currentChatDetails?.chatMembers.map(friend=><>
                        <div className="my-1">
                            <span>{friend.nickname} ({friend.userId})</span>
                            <button className="btn btn-sm btn-outline btn-primary ml-2" onClick={()=>fetchDeleteChatMember(friend.userId)}>Usuń z czatu</button>
                            <button className="btn btn-sm btn-outline btn-primary ml-2" onClick={()=>initializeChangeNickname(friend.userId)}>Zmień nick</button>
                        </div>
                        </>)}
                    </div>
                    <div className="divider" />
                    <div>
                        <h4 className="font-bold text-md">Dodaj znajomych do czatu</h4>
                        <div className="ml-8">
                            {currentUserFriendsList.filter(firend=> currentChatDetails?.chatMembers.every(e=>e.userId != firend.friendId)).map(friend=>
                                <div key={friend.friendId}>
                                    <span>{friend.firstName} {friend.lastName} ({friend.friendId})</span>
                                    {
                                        <button className="btn btn-sm btn-outline btn-primary ml-2" onClick={()=>fetchAddChatMember(friend.friendId)}>Dodaj do czatu</button>
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="divider" />
                    <button className="btn btn-sm btn-outline btn-primary ml-2" onClick={()=>fetchDeleteChat()}>Usuń czat</button>
                </div>
            </div>
            <dialog className={`modal ${changeNickNameModal ? "modal-open" : "" }`}>
                <div className="modal-box w-11/12 max-w-3xl">
                    <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2" onClick={() => setChangeNickNameModal(false)}>X</button>
                    <h3 className="font-bold text-md mb-2">Zmień pseudonim</h3>

                    <div>Obecny nick: {selectedChatMember?.nickname}</div>
                    <div>
                        Nowy nick: <input type="text" className="input input-xs input-primary" value={newNickName} onInput={(e)=>setNewNickName(e.currentTarget.value)}/> 
                        {newNickName.length > 3 && <button className="btn btn-sm btn-outline btn-primary ml-2" onClick={()=>fetchChangeChatMemberNickkname()}>Zapisz zmiany</button>}
                    </div>
                </div>
            </dialog>
        </dialog>
    </>


}

