

/*vvvvvvvvvv jotai*/
import { atom, getDefaultStore } from 'jotai'
/*^^^^^^^^^^ jotai*/

/*vvvvvvvvvv api types*/
import { User, Chat, ChatDetail, Message, Friend, OnlineUser } from "../api/types"
import { RequestStatus, RequestResponseError } from "../api/axios"
/*^^^^^^^^^^ api types*/

/*vvvvvvvvvv api calls*/
import { getUserChats, GetUserChatsRequestError } from '../api/chats/getUserChats'
import { getChatDetails, ChatDetailsRequestError} from "../api/chats/getChatDetails"
import { getMessages, GetMessagesRequestError} from "../api/messages/getMessages"
import { getFriendsList, GetFirendsListRequestError} from "../api/friends/getFriendsList"
import { getFirendsInvitesList, GetFirendsInvitesListRequestError} from "../api/friends/getFriendsInvitesList"
/*^^^^^^^^^^ api calls*/


/*vvvvvvvvvv current user*/
export const userAtom = atom<User | null>(null);
/*^^^^^^^^^^ current user*/

/*vvvvvvvvvv current chat Id*/
export const currentChatIdAtom = atom<number | null>(null);
/*^^^^^^^^^^ current chat Id*/


/*vvvvvvvvvv current user chats list*/
export const userChatsAtom = atom<Chat[]>([]);
export const userChatsRequestStatusAtom = atom<RequestStatus>(RequestStatus.Idle);
export const userChatsRequestErrorAtom = atom<RequestResponseError<GetUserChatsRequestError>>(null);
export const fetchUserChats = async () =>{
    // get store
    const store = getDefaultStore();

    // reset values
    store.set(userChatsRequestStatusAtom, RequestStatus.Idle);
    store.set(userChatsRequestErrorAtom, null);

    // get current user
    const currentUser = store.get(userAtom);
    
    // get current chat id
    const currentChatId = store.get(currentChatIdAtom);

    // if user is not login
    if(currentUser == null){
        store.set(userChatsRequestStatusAtom, RequestStatus.Error);
        store.set(userChatsRequestErrorAtom, {baseError: "użytkwnik nie jest zalogowany", error: null});
        return;
    }

    // try download data
    const resoult = await getUserChats({id: currentUser.id}, (status)=>store.set(userChatsRequestStatusAtom, status))

    // if error while downloading data
    if(resoult.status == false){
        store.set(userChatsRequestErrorAtom, resoult.data)
        return;
    }

    // set downloaded data
    store.set(userChatsAtom, resoult.data)
    
    // set current chat id if no chat is selected and user has any chats
    if(resoult.data.length > 0 && currentChatId == null)
        store.set(currentChatIdAtom, resoult.data[0].id)
}
/*^^^^^^^^^^ current user chats list*/


/*vvvvvvvvvv current chat details*/
export const currentChatDetailsAtom = atom<ChatDetail | null>(null);
export const currentChatDetailsStatusAtom = atom<RequestStatus>(RequestStatus.Idle);
export const currentChatDetailsErrorAtom = atom<RequestResponseError<ChatDetailsRequestError>>(null);
export const fetchCurrentChatDetails = async () => {
    // get store
    const store = getDefaultStore()

    // reset values
    store.set(currentChatDetailsStatusAtom, RequestStatus.Idle);
    store.set(currentChatDetailsErrorAtom, null);
    
    // get current chat id
    const currentChatId = store.get(currentChatIdAtom)

    // if no chat is selected
    if(currentChatId == null){
        store.set(currentChatDetailsStatusAtom, RequestStatus.Error);
        store.set(currentChatDetailsErrorAtom, {baseError: "nie wybrano czatu", error: null});
        return;
    }

    // try download data
    const resoult = await getChatDetails({id: currentChatId}, (status)=>store.set(currentChatDetailsStatusAtom, status))

    // if error while downloading data
    if(resoult.status == false){
        store.set(currentChatDetailsErrorAtom, resoult.data)
        return;
    }

    // set downloaded data
    store.set(currentChatDetailsAtom, resoult.data)

}
/*^^^^^^^^^^ current chat details*/


/*vvvvvvvvvv current chat messages*/
export const currentChatMessagesAtom = atom<Message[]>([]);
export const currentChatMessagesStatusAtom = atom<RequestStatus>(RequestStatus.Idle);
export const currentChatMessagesErrorAtom = atom<RequestResponseError<GetMessagesRequestError>>(null);
export const fetchCurrentChatMessages = async () =>{
    // get store
    const store = getDefaultStore()

    // reset values
    store.set(currentChatMessagesStatusAtom, RequestStatus.Idle);
    store.set(currentChatMessagesErrorAtom, null);

    // get current chat id
    const currentChatId = store.get(currentChatIdAtom)

    // if no chat is selected
    if(currentChatId == null){
        store.set(currentChatDetailsStatusAtom, RequestStatus.Error);
        store.set(currentChatDetailsErrorAtom, {baseError: "nie wybrano czatu", error: null});
        return;
    }

    // try download data
    const resoult = await getMessages({chatId: currentChatId}, (status)=>store.set(currentChatMessagesStatusAtom, status));

    // if error while downloading data
    if(resoult.status == false){
        store.set(currentChatMessagesErrorAtom, resoult.data)
        return;
    }

    // set downloaded data
    store.set(currentChatMessagesAtom, resoult.data)
}
/*^^^^^^^^^^ current chat messages*/

/*vvvvvvvvvv current user friends list*/
export const friendsListAtom = atom<Friend[]>([]);
export const friendsListStatusAtom = atom<RequestStatus>(RequestStatus.Idle);
export const friendsListErrorAtom = atom<RequestResponseError<GetFirendsListRequestError>>(null);
export const fetchFriendsList = async () =>{
    // get store
    const store = getDefaultStore()

    // reset values
    store.set(friendsListStatusAtom, RequestStatus.Idle);
    store.set(friendsListErrorAtom, null);

    // get current user
    const currentUser = store.get(userAtom);

    // if user is not login
    if(currentUser == null){
        store.set(friendsListStatusAtom, RequestStatus.Error);
        store.set(friendsListErrorAtom, {baseError: "użytkwnik nie jest zalogowany", error: null});
        return;
    }

    // try download data
    const resoult = await getFriendsList({userId: currentUser.id}, (status)=>store.set(friendsListStatusAtom, status));

    // if error while downloading data
    if(resoult.status == false){
        store.set(friendsListErrorAtom, resoult.data)
        return;
    }

    // set downloaded data
    store.set(friendsListAtom, resoult.data)
}
/*^^^^^^^^^^ current user friends list*/

/*vvvvvvvvvv current user invites list*/
export const friendsInviteListAtom = atom<Friend[]>([]);
export const friendsInviteStatustAtom = atom<RequestStatus>(RequestStatus.Idle);
export const friendsInviteListErrorAtom = atom<RequestResponseError<GetFirendsInvitesListRequestError>>(null);
export const fetchFriendsInviteList = async () =>{
    // get store
    const store = getDefaultStore()

    // reset values
    store.set(friendsInviteStatustAtom, RequestStatus.Idle);
    store.set(friendsInviteListErrorAtom, null);

    // get current user
    const currentUser = store.get(userAtom);

    // if user is not login
    if(currentUser == null){
        store.set(friendsInviteStatustAtom, RequestStatus.Error);
        store.set(friendsInviteListErrorAtom, {baseError: "użytkwnik nie jest zalogowany", error: null});
        return;
    }

    // try download data
    const resoult = await getFirendsInvitesList({userId: currentUser.id}, (status)=>store.set(friendsInviteStatustAtom, status));

    // if error while downloading data
    if(resoult.status == false){
        store.set(friendsInviteListErrorAtom, resoult.data);
        return;
    }

    // set downloaded data
    store.set(friendsInviteListAtom, resoult.data);
}
/*^^^^^^^^^^ current user invites list*/

export const onlineUsersAtom = atom<OnlineUser[]>([]);
