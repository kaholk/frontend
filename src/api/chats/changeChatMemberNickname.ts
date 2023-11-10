

import { apiPatch, RequestStatusHook} from "../axios"


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
    return apiPatch<ChangeChatMemberNicknamePayload, ResponseType, ChangeChatMemberNicknameRequestResponseError>("/chat/changeNickname", payload, requestStatusHook)
}