
import { RequestStatusHook, apiCall, ApiCallType } from "../axios"
import { User } from "../types"

/*Types*/
export type UserDetailsPayload = {
    id: number
}

export type UserDetailsRequestResponseError = string

/*Initial Values*/
export const initalUserDetailsPayload:UserDetailsPayload = {
    id: 0
}



export const getUserDetails = async (userDetailsPayload: UserDetailsPayload = initalUserDetailsPayload, requestStatusHook?: RequestStatusHook) =>{
    const url = `/user/${userDetailsPayload.id}`
    return apiCall<undefined, User, UserDetailsRequestResponseError>(ApiCallType.GET, url, undefined, requestStatusHook)
}