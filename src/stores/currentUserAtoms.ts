




import { atom, getDefaultStore } from 'jotai'
import { User, Chat, ChatDetail, Message, Friend } from "../api/types"

import { RequestStatus, RequestResponseError } from "../api/axios"

import { getUserChats, GetUserChatsRequestError } from '../api/chats/getUserChats'


export const userAtom = atom<User | null>(null);

export const userChatsAtom = atom<Chat[]>([]);
export const userChatsRequestStatusAtom = atom<RequestStatus>(RequestStatus.Idle);
export const userChatsRequestErrorAtom = atom<RequestResponseError<GetUserChatsRequestError>>(null);

export const currentChatIdAtom = atom<number | null>(null);

export const currentChatDetailsAtom = atom<ChatDetail | null>(null);
export const currentChatMessagesAtom = atom<Message[]>([]);
export const currentUserFriendsListAtom = atom<Friend[]>([]);
export const currentUserFriendsInviteListAtom = atom<Friend[]>([]);


export const fetchUserChats = async () =>{
    const store = getDefaultStore()
    const currentUser = store.get(userAtom)

    if(currentUser == null) return;
    const resoult = await getUserChats({id: currentUser.id}, (status)=>store.set(userChatsRequestStatusAtom, status))
    if(resoult.status == false){
        store.set(userChatsRequestErrorAtom, resoult.data)
        return;
    }
    store.set(userChatsAtom, resoult.data)
    if(resoult.data.length > 0)
        store.set(currentChatIdAtom, resoult.data[0].id)
}