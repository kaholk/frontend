

import { apiCall, ApiCallType, RequestStatusHookType} from "../axios"
import { ChatMember } from "../types"

export type ChangeChatMemberNicknamePayload = {
    chatId: number,
    userId: number,
    nickname: string
}


export type ChangeChatMemberNicknameRequestError = {

}

export const initialChangeChatMemberNicknamePayload: ChangeChatMemberNicknamePayload = {
    chatId: 0,
    userId: 0,
    nickname: ""
}


export const changeChatMemberNickname = async (payload: ChangeChatMemberNicknamePayload = initialChangeChatMemberNicknamePayload, requestStatusHook?: RequestStatusHookType) =>{
    return apiCall<ChangeChatMemberNicknamePayload, ChatMember[], ChangeChatMemberNicknameRequestError>(ApiCallType.PATCH, "/chat/changeNickname", payload, requestStatusHook)
}