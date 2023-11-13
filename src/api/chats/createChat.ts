
import { apiCall, ApiCallType, RequestStatusHook} from "../axios"
import { Chat } from "../types"


export type CreateChatPayload = {
    name?: string;
    chatMembers: number[];
} 

export type CreateChatRequestResponseError = {
    message: {
        chatMembers: string,
        name: string
    }
}

export const initialCreateChatPayload: CreateChatPayload = {
    name: "",
    chatMembers: []
}

export const createChat = async (payload: CreateChatPayload = initialCreateChatPayload, requestStatusHook?: RequestStatusHook) => {
    return apiCall<CreateChatPayload, Chat, CreateChatRequestResponseError>(ApiCallType.POST, "/chat/", payload, requestStatusHook)
}