

import { RequestStatusHookType, apiCall, ApiCallType } from "../axios"
import { ChatMember } from "../types"

export type DeleteChatMemberPayload = {
    chatId: number,
    userId: number
}

export const initialDeleteChatMemberPayload: DeleteChatMemberPayload = {
    chatId: 0,
    userId: 0
}

export type DeleteChatMemberRequestError = string


export const deleteChatMember = async (payload: DeleteChatMemberPayload = initialDeleteChatMemberPayload, requestStatusHook?: RequestStatusHookType) =>{
    return apiCall<DeleteChatMemberPayload, ChatMember[], DeleteChatMemberRequestError>(ApiCallType.DELETE, "/chat/delMember", payload, requestStatusHook)
}