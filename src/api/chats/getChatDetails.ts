

import { RequestStatusHook, apiGet } from "../axios"
import { ChatDetail } from "../types"

export type ChatDetailsPayload = {
    id: number
}

export type ChatDetailsRequestResponseError = string

/*Initial Values*/
export const initalChatDetailsPayload:ChatDetailsPayload = {
    id: 0
}


export const getChatDetails = async (payload: ChatDetailsPayload = initalChatDetailsPayload, requestStatusHook?: RequestStatusHook) =>{
    const url = `/chat/details/${payload.id}`
    return apiGet<ChatDetail, ChatDetailsRequestResponseError>(url, requestStatusHook)
}