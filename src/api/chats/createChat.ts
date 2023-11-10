
import { apiPost, RequestStatusHook} from "../axios"
import { Chat } from "../types"


export type CreateChatPayload = {
    name?: string;
    chatMembers: number[];
} 

export type CreateChatRequestResponseError = {

}

export const initialCreateChatPayload: CreateChatPayload = {
    name: "",
    chatMembers: []
}

export const createChat = async (payload: CreateChatPayload = initialCreateChatPayload, requestStatusHook?: RequestStatusHook) => {
    return apiPost<CreateChatPayload, Chat, CreateChatRequestResponseError>("/chat/", payload, requestStatusHook)
}