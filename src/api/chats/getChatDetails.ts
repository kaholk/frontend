

import { apiCall, ApiCallType, RequestStatusHook } from "../axios"
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
    return apiCall<undefined, ChatDetail, ChatDetailsRequestResponseError>(ApiCallType.GET, url, undefined, requestStatusHook)
}