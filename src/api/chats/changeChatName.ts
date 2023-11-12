
import { apiCall, ApiCallType, RequestStatusHook} from "../axios"
import { ChatDetail } from "../types"

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

export const changeChatName = async (payload: ChangeChatNamePayload = initialChangeChatNamePayload, requestStatusHook?: RequestStatusHook) =>{
    return apiCall<ChangeChatNamePayload, ChatDetail, ChangeChatNameRequestResponseError>(ApiCallType.PATCH, "/chat", payload, requestStatusHook)
}