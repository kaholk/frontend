

import { apiCall, ApiCallType, RequestStatusHookType} from "../axios"
import { ChatMember } from "../types"

export type AddChatMemberPayload = {
    chatId: number,
    userId: number
}


export type AddChatMemberRequestError = {

}

export const initialAddChatMemberPayload:AddChatMemberPayload = {
    chatId: 0,
    userId: 0
}

export const addChatMember = async (payload: AddChatMemberPayload = initialAddChatMemberPayload, requestStatusHook?: RequestStatusHookType) =>{
    return apiCall<AddChatMemberPayload, ChatMember[], AddChatMemberRequestError>(ApiCallType.PATCH, "/chat/addMember", payload, requestStatusHook)
}