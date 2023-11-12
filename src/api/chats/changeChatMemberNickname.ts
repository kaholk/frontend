

import { apiCall, ApiCallType, RequestStatusHook} from "../axios"


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


type ResponseType ={
    
}

export const changeChatMemberNickname = async (payload: ChangeChatMemberNicknamePayload = initialChangeChatMemberNicknamePayload, requestStatusHook?: RequestStatusHook) =>{
    return apiCall<ChangeChatMemberNicknamePayload, ResponseType, ChangeChatMemberNicknameRequestResponseError>(ApiCallType.PATCH, "/chat/changeNickname", payload, requestStatusHook)
}