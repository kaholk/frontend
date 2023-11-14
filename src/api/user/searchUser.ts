
import { apiCall, ApiCallType, RequestStatusHookType } from "../axios";
import { User } from "../types"

/*Types*/
export type SearchUsersPayload = {
    keyword: string
}

export type SearchUsersRequestError = {

}

/*Initial Values*/
const initialSearchUsersPayload:SearchUsersPayload = {
    keyword: ""
}

/*Methods*/
export const searchUsers = async (payload:SearchUsersPayload = initialSearchUsersPayload, requestStatusHook?: RequestStatusHookType)=> {
    const url = `/user/find/${payload.keyword}`
    return apiCall<undefined, User[], SearchUsersRequestError>(ApiCallType.GET, url, undefined, requestStatusHook)
}