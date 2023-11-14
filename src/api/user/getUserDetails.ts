
import { RequestStatusHookType, apiCall, ApiCallType } from "../axios"
import { User } from "../types"

/*Types*/
export type UserDetailsPayload = {
    id: number
}

export type UserDetailsRequestError = string

/*Initial Values*/
export const initalUserDetailsPayload:UserDetailsPayload = {
    id: 0
}



export const getUserDetails = async (userDetailsPayload: UserDetailsPayload = initalUserDetailsPayload, requestStatusHook?: RequestStatusHookType) =>{
    const url = `/user/${userDetailsPayload.id}`
    return apiCall<undefined, User, UserDetailsRequestError>(ApiCallType.GET, url, undefined, requestStatusHook)
}