


import { apiCall, ApiCallType, RequestStatusHook } from "../axios"
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
    return apiCall<AcceptInvitePayload, Friend, AcceptInviteRequestResponseError>(ApiCallType.POST, "friend/accept", payload, requestStatusHook)
}