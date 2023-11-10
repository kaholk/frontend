
import { apiPatch, RequestStatusHook} from "../axios"


export type ChangeChatNamePayload = {
    chatId: number,
    name: string
}

export type ChangeChatNameRequestResponseError = {
    email?: string
}

export const initialChangeChatNamePayload:ChangeChatNamePayload = {
    chatId: 0,
    name: ""
}

export type Chat = {

}

export const changeChatName = async (payload: ChangeChatNamePayload = initialChangeChatNamePayload, requestStatusHook?: RequestStatusHook) =>{
    return apiPatch<ChangeChatNamePayload, Chat, ChangeChatNameRequestResponseError>("/chat", payload, requestStatusHook)
}