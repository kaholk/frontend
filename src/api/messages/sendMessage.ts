

import { apiCall, ApiCallType, RequestStatusHook } from "../axios"


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

export type ResponseType = unknown

export const sendMessage = async (payload: SendMessagePayload = initialSendMessagePayload, requestStatusHook?: RequestStatusHook) =>{
    return apiCall<SendMessagePayload, ResponseType, SendMessageRequestResponseError>(ApiCallType.POST, "/message", payload, requestStatusHook)
}