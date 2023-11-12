

import { apiCall, ApiCallType, RequestStatusHook } from "../axios"
import { Message } from "../types"

export type GetMessagesPayload = {
    id: number
}

export const initialGetMessagesPayload: GetMessagesPayload = {
    id: 0
}

export type GetMessagesRequestResponseError = {

}

export const getMessages = async (payload: GetMessagesPayload = initialGetMessagesPayload, requestStatusHook?: RequestStatusHook) =>{
    const url = `/message/${payload.id}`
    return apiCall<undefined, Message[], GetMessagesRequestResponseError>(ApiCallType.GET, url, undefined, requestStatusHook)
}