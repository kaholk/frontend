

import { apiCall, ApiCallType, RequestStatusHookType } from "../axios"
import { Message } from "../types"

export type GetMessagesPayload = {
    id: number
}

export const initialGetMessagesPayload: GetMessagesPayload = {
    id: 0
}

export type GetMessagesRequestError = {

}

export const getMessages = async (payload: GetMessagesPayload = initialGetMessagesPayload, requestStatusHook?: RequestStatusHookType) =>{
    const url = `/message/${payload.id}`
    return apiCall<undefined, Message[], GetMessagesRequestError>(ApiCallType.GET, url, undefined, requestStatusHook)
}