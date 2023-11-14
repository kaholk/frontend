



import { apiCall, ApiCallType, RequestStatusHookType } from "../axios"
import { Chat } from "../types"

export type GetUserChatsPayload = {
    id: number
}

export type GetUserChatsRequestError = string

/*Initial Values*/
export const initalGetUserChatsPayload:GetUserChatsPayload = {
    id: 0
}


export const getUserChats = async (payload: GetUserChatsPayload = initalGetUserChatsPayload, requestStatusHook?: RequestStatusHookType) =>{
    const url = `/chat/${payload.id}`
    return apiCall<undefined, Chat[], GetUserChatsRequestError>(ApiCallType.GET, url, undefined, requestStatusHook)
}