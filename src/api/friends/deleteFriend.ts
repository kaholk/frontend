

import { apiDelete, RequestStatusHook } from "../axios"
import { Friend } from "../types"


/*Types*/
export type DeleteFriendPayload = {
    userId: number,
    friendId: number
}

export type DeleteFriendRequestResponseError = {

}

export const initialDeleteFriendPayload:DeleteFriendPayload = {
    friendId: 0,
    userId: 0,
}


export const deleteFriend = async (payload: DeleteFriendPayload = initialDeleteFriendPayload, requestStatusHook?: RequestStatusHook) =>{
    // return apiDelete
}