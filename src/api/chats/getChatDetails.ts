

import { apiCall, ApiCallType, RequestStatusHookType } from "../axios"
import { ChatDetail } from "../types"

export type ChatDetailsPayload = {
    id: number
}

export type ChatDetailsRequestError = string

/*Initial Values*/
export const initalChatDetailsPayload:ChatDetailsPayload = {
    id: 0
}


export const getChatDetails = async (payload: ChatDetailsPayload = initalChatDetailsPayload, requestStatusHook?: RequestStatusHookType) =>{
    const url = `/chat/details/${payload.id}`
    return apiCall<undefined, ChatDetail, ChatDetailsRequestError>(ApiCallType.GET, url, undefined, requestStatusHook)
}