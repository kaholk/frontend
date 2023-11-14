
import { apiCall, ApiCallType, RequestStatusHookType } from "../axios"
import { Friend } from "../types"

/*Types*/
export type GetFirendsListPayload = {
    userId: number
}

export type GetFirendsListRequestError = {

}


/*Initial Values*/
export const initialGetFirendsListPayload:GetFirendsListPayload = {
    userId: 0
}


export const getFriendsList = async (payload:GetFirendsListPayload = initialGetFirendsListPayload, requestStatusHook?: RequestStatusHookType)=>{
    const url = `/friend/${payload.userId}`
    return apiCall<undefined, Friend[],GetFirendsListRequestError>(ApiCallType.GET, url, undefined, requestStatusHook)
}