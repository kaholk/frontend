
import { apiPost, RequestStatusHook} from "../axios"


export type CreateChatPayload = {
    name: string,
    chatMembers: number[]
}

export type CreateChatRequestResponseError = {

}

export const initialCreateChatPayload: CreateChatPayload = {
    name: "",
    chatMembers: []
}



export type Chat = {

}

export const createChat = async (payload: CreateChatPayload = initialCreateChatPayload, requestStatusHook?: RequestStatusHook) => {
    return apiPost<CreateChatPayload, Chat, CreateChatRequestResponseError>("/chat/", payload, requestStatusHook)
}