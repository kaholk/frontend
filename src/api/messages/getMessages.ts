

import { apiCall, ApiCallType, RequestStatusHookType } from "../axios"
import { Message } from "../types"

export type GetMessagesPayload = {
    chatId: number
}

export const initialGetMessagesPayload: GetMessagesPayload = {
    chatId: 0
}

export type GetMessagesRequestError = {

}

export const getMessages = async (payload: GetMessagesPayload = initialGetMessagesPayload, requestStatusHook?: RequestStatusHookType) =>{
    const url = `/message/${payload.chatId}`
    return apiCall<undefined, Message[], GetMessagesRequestError>(ApiCallType.GET, url, undefined, requestStatusHook)
}