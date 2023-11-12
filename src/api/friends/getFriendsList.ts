
import { apiCall, ApiCallType, RequestStatusHook } from "../axios"
import { Friend } from "../types"

/*Types*/
export type GetFirendsListPayload = {
    id: number
}

export type GetFirendsListRequestResponseError = {

}


/*Initial Values*/
export const initialGetFirendsListPayload:GetFirendsListPayload = {
    id: 0
}


export const getFriendsList = async (payload:GetFirendsListPayload = initialGetFirendsListPayload, requestStatusHook?: RequestStatusHook)=>{
    const url = `/friend/${payload.id}`
    return apiCall<undefined, Friend[],GetFirendsListRequestResponseError>(ApiCallType.GET, url, undefined, requestStatusHook)
}