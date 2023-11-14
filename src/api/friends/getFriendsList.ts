
import { apiCall, ApiCallType, RequestStatusHookType } from "../axios"
import { Friend } from "../types"

/*Types*/
export type GetFirendsListPayload = {
    id: number
}

export type GetFirendsListRequestError = {

}


/*Initial Values*/
export const initialGetFirendsListPayload:GetFirendsListPayload = {
    id: 0
}


export const getFriendsList = async (payload:GetFirendsListPayload = initialGetFirendsListPayload, requestStatusHook?: RequestStatusHookType)=>{
    const url = `/friend/${payload.id}`
    return apiCall<undefined, Friend[],GetFirendsListRequestError>(ApiCallType.GET, url, undefined, requestStatusHook)
}