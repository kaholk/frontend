

import { apiCall, ApiCallType, RequestStatusHook } from "../axios"
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

export type SendMessageRequestResponseError = {

}

export const sendMessage = async (payload: SendMessagePayload = initialSendMessagePayload, requestStatusHook?: RequestStatusHook) =>{
    return apiCall<SendMessagePayload, Message, SendMessageRequestResponseError>(ApiCallType.POST, "/message", payload, requestStatusHook)
}