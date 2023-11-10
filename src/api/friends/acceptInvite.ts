


import { apiPost, RequestStatusHook } from "../axios"
import { Friend } from "../types"


/*Types*/
export type AcceptInvitePayload = {
    userId: number,
    friendId: number
}

export type AcceptInviteRequestResponseError = {

}

export const initialAcceptInvitePayload: AcceptInvitePayload = {
    friendId: 0,
    userId: 0
}

export const acceptInvite = async (payload: AcceptInvitePayload = initialAcceptInvitePayload, requestStatusHook?: RequestStatusHook) =>{
    return apiPost<AcceptInvitePayload, Friend, AcceptInviteRequestResponseError>("friend/accept", payload, requestStatusHook)
}