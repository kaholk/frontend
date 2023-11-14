
import { apiCall, ApiCallType, RequestStatusHookType} from "../axios"
import { Chat } from "../types"


export type CreateChatPayload = {
    name?: string;
    chatMembers: number[];
} 

export type CreateChatRequestError = {
    message: {
        chatMembers: string,
        name: string
    }
}

export const initialCreateChatPayload: CreateChatPayload = {
    name: "",
    chatMembers: []
}

export const createChat = async (payload: CreateChatPayload = initialCreateChatPayload, requestStatusHook?: RequestStatusHookType) => {
    return apiCall<CreateChatPayload, Chat, CreateChatRequestError>(ApiCallType.POST, "/chat/", payload, requestStatusHook)
}