




import { atom } from 'jotai'
import { User, Chat, ChatDetail, Message, Friend } from "../api/types"


export const currentUserAtom = atom<User | null>(null);
export const currentUserChatsAtom = atom<Chat[]>([]);
export const currentChatIdAtom = atom<number | null>(null);
export const currentChatDetailsAtom = atom<ChatDetail | null>(null);
export const currentChatMessagesAtom = atom<Message[]>([]);
export const currentUserFriendsListAtom = atom<Friend[]>([]);
export const currentUserFriendsInviteListAtom = atom<Friend[]>([]);