


import { apiCall, ApiCallType, RequestStatusHookType } from "../axios"
import { Friend } from "../types"


/*Types*/
export type RejectInvitePayload = {
    userId: number,
    friendId: number
}

export type RejectInviteRequestError = {

}

export const initialRejectInvitePayload: RejectInvitePayload = {
    friendId: 0,
    userId: 0
}

export const RejectInvite = async (payload: RejectInvitePayload = initialRejectInvitePayload, requestStatusHook?: RequestStatusHookType) =>{
    return apiCall<RejectInvitePayload, Friend, RejectInviteRequestError>(ApiCallType.POST, "friend/Reject", payload, requestStatusHook)
}