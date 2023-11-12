

import { apiCall, ApiCallType, RequestStatusHook} from "../axios"
import { ChatMember } from "../types"

export type ChangeChatMemberNicknamePayload = {
    chatId: number,
    userId: number,
    nickname: string
}


export type ChangeChatMemberNicknameRequestResponseError = {

}

export const initialChangeChatMemberNicknamePayload: ChangeChatMemberNicknamePayload = {
    chatId: 0,
    userId: 0,
    nickname: ""
}


export const changeChatMemberNickname = async (payload: ChangeChatMemberNicknamePayload = initialChangeChatMemberNicknamePayload, requestStatusHook?: RequestStatusHook) =>{
    return apiCall<ChangeChatMemberNicknamePayload, ChatMember[], ChangeChatMemberNicknameRequestResponseError>(ApiCallType.PATCH, "/chat/changeNickname", payload, requestStatusHook)
}