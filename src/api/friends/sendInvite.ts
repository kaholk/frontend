

import { apiCall, ApiCallType, RequestStatusHookType } from "../axios"
import { Friend } from "../types"



/*Types*/
export type SendInvitePayload = {
    userId: number,
    friendId: number
}


export type SendInviteRequestError = {
    message: {
        friendId: string
    }
}

export const initialSendInvitePayload:SendInvitePayload = {
    friendId: 0,
    userId: 0
}



export const sendInvite = async (payload: SendInvitePayload = initialSendInvitePayload, requestStatusHook?: RequestStatusHookType) =>{
    return apiCall<SendInvitePayload, Friend[], SendInviteRequestError>(ApiCallType.POST, "/friend/invite", payload, requestStatusHook)
}