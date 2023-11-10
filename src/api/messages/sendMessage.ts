

import { apiPost, RequestStatusHook } from "../axios"


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
    return apiPost<SendMessagePayload, ResponseType, SendMessageRequestResponseError>("/message", payload, requestStatusHook)
}