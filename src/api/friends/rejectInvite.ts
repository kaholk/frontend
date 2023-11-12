


import { apiCall, ApiCallType, RequestStatusHook } from "../axios"
import { Friend } from "../types"


/*Types*/
export type RejectInvitePayload = {
    userId: number,
    friendId: number
}

export type RejectInviteRequestResponseError = {

}

export const initialRejectInvitePayload: RejectInvitePayload = {
    friendId: 0,
    userId: 0
}

export const RejectInvite = async (payload: RejectInvitePayload = initialRejectInvitePayload, requestStatusHook?: RequestStatusHook) =>{
    return apiCall<RejectInvitePayload, Friend, RejectInviteRequestResponseError>(ApiCallType.POST, "friend/Reject", payload, requestStatusHook)
}