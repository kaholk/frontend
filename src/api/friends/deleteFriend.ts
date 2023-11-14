

import { apiCall, ApiCallType, RequestStatusHookType } from "../axios"
import { Friend } from "../types"


/*Types*/
export type DeleteFriendPayload = {
    userId: number,
    friendId: number
}

export type DeleteFriendRequestError = {

}

export const initialDeleteFriendPayload:DeleteFriendPayload = {
    friendId: 0,
    userId: 0,
}


export const deleteFriend = async (payload: DeleteFriendPayload = initialDeleteFriendPayload, requestStatusHook?: RequestStatusHookType) =>{
    return apiCall<DeleteFriendPayload, unknown, DeleteFriendRequestError>(ApiCallType.DELETE, "/chat/delMember", payload, requestStatusHook)
}