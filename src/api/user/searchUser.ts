
import { apiCall, ApiCallType, RequestStatusHook } from "../axios";
import { User } from "../types"

/*Types*/
export type SearchUsersPayload = {
    keyword: string
}

export type SearchUsersRequestResponseError = {

}

/*Initial Values*/
const initialSearchUsersPayload:SearchUsersPayload = {
    keyword: ""
}

/*Methods*/
export const searchUsers = async (payload:SearchUsersPayload = initialSearchUsersPayload, requestStatusHook?: RequestStatusHook)=> {
    const url = `/user/find/${payload.keyword}`
    return apiCall<undefined, User[], SearchUsersRequestResponseError>(ApiCallType.GET, url, undefined, requestStatusHook)
}