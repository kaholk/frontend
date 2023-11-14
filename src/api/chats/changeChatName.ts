
import { apiCall, ApiCallType, RequestStatusHookType} from "../axios"
import { ChatDetail } from "../types"

export type ChangeChatNamePayload = {
    chatId: number,
    name: string
}

export type ChangeChatNameRequestError = {
    email?: string
}

export const initialChangeChatNamePayload:ChangeChatNamePayload = {
    chatId: 0,
    name: ""
}

export const changeChatName = async (payload: ChangeChatNamePayload = initialChangeChatNamePayload, requestStatusHook?: RequestStatusHookType) =>{
    return apiCall<ChangeChatNamePayload, ChatDetail, ChangeChatNameRequestError>(ApiCallType.PATCH, "/chat", payload, requestStatusHook)
}