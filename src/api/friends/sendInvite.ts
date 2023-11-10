

import { apiPost, RequestStatusHook } from "../axios"
import { Friend } from "../types"



/*Types*/
export type SendInvitePayload = {
    userId: number,
    friendId: number
}


export type SendInviteRequestResponseError = {
    message: {
        friendId: string
    }
}

export const initialSendInvitePayload:SendInvitePayload = {
    friendId: 0,
    userId: 0
}



export const sendInvite = async (payload: SendInvitePayload = initialSendInvitePayload, requestStatusHook?: RequestStatusHook) =>{
    return apiPost<SendInvitePayload, Friend[], SendInviteRequestResponseError>("/friend/invite", payload, requestStatusHook)
}