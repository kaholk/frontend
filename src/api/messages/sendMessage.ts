

import { apiCall, ApiCallType, RequestStatusHookType } from "../axios"
import { Message } from "../types"

export type SendMessagePayload = {
    chatId: number,
    userId: number,
    message: string
}

export const initialSendMessagePayload: SendMessagePayload = {
    chatId: 0,
    userId: 0,
    message: ""
}

export type SendMessageRequestError = {

}

export const sendMessage = async (payload: SendMessagePayload = initialSendMessagePayload, requestStatusHook?: RequestStatusHookType) =>{
    return apiCall<SendMessagePayload, Message, SendMessageRequestError>(ApiCallType.POST, "/message", payload, requestStatusHook)
}