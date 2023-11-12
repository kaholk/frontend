

import { apiCall, ApiCallType, RequestStatusHook} from "../axios"
import { ChatMember } from "../types"

export type AddChatMemberPayload = {
    chatId: number,
    userId: number
}


export type AddChatMemberRequestResponseError = {

}

export const initialAddChatMemberPayload:AddChatMemberPayload = {
    chatId: 0,
    userId: 0
}

export const addChatMember = async (payload: AddChatMemberPayload = initialAddChatMemberPayload, requestStatusHook?: RequestStatusHook) =>{
    return apiCall<AddChatMemberPayload, ChatMember[], AddChatMemberRequestResponseError>(ApiCallType.PATCH, "/chat/addMember", payload, requestStatusHook)
}