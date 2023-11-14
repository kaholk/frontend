
import { apiCall, ApiCallType, RequestStatusHookType} from "../axios"
import { User } from "../types"

/*Types*/
export type UpdateUserPayload = {
    id: number,
    firstName: string,
    lastName: string,
}

export type UpdateUserRequestError = {
    firstName?: string
    lastName?: string
}

/*Initial Values*/
export const initialUserUpdatePayload:UpdateUserPayload = {
    id: 0,
    firstName: "",
    lastName: ""
} 

export const updateUser = async (payload: UpdateUserPayload, requestStatusHook?: RequestStatusHookType) =>{
    return apiCall<UpdateUserPayload, User, UpdateUserRequestError>(ApiCallType.PATCH, "/user", payload, requestStatusHook)
}