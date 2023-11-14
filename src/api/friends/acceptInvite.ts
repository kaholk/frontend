


import { apiCall, ApiCallType, RequestStatusHookType } from "../axios"
import { Friend } from "../types"


/*Types*/
export type AcceptInvitePayload = {
    userId: number,
    friendId: number
}

export type AcceptInviteRequestError = {

}

export const initialAcceptInvitePayload: AcceptInvitePayload = {
    friendId: 0,
    userId: 0
}

export const acceptInvite = async (payload: AcceptInvitePayload = initialAcceptInvitePayload, requestStatusHook?: RequestStatusHookType) =>{
    return apiCall<AcceptInvitePayload, Friend, AcceptInviteRequestError>(ApiCallType.POST, "friend/accept", payload, requestStatusHook)
}