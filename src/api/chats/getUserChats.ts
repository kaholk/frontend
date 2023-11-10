



import { RequestStatusHook, apiGet } from "../axios"
import { Chat } from "../types"

export type GetUserChatsPayload = {
    id: number
}

export type GetUserChatsRequestResponseError = string

/*Initial Values*/
export const initalGetUserChatsPayload:GetUserChatsPayload = {
    id: 0
}


export const getUserChats = async (payload: GetUserChatsPayload = initalGetUserChatsPayload, requestStatusHook?: RequestStatusHook) =>{
    const url = `/chat/${payload.id}`
    return apiGet<Chat[], GetUserChatsRequestResponseError>(url, requestStatusHook)
}