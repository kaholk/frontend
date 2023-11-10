

import { apiPost, RequestStatusHook} from "../axios"


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

export type Chat = {

}

export const addChatMember = async (payload: AddChatMemberPayload = initialAddChatMemberPayload, requestStatusHook?: RequestStatusHook) =>{
    return apiPost<AddChatMemberPayload, Chat, AddChatMemberRequestResponseError>("/chat/addMember", payload, requestStatusHook)
}