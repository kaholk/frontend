

import { RequestStatusHook, apiCall, ApiCallType } from "../axios"


export type DeleteChatMemberPayload = {
    chatId: number,
    userId: number
}

export const initialDeleteChatMemberPayload: DeleteChatMemberPayload = {
    chatId: 0,
    userId: 0
}

export type DeleteChatMemberRequestResponseError = string


export const deleteChatMember = async (payload: DeleteChatMemberPayload = initialDeleteChatMemberPayload, requestStatusHook?: RequestStatusHook) =>{
    return apiCall(ApiCallType.DELETE, "/chat/delMember", payload, requestStatusHook)
}