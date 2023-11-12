
import { apiCall, ApiCallType, RequestStatusHook} from "../axios"
import { User } from "../types"

/*Types*/
export type UpdateUserPayload = {
    id: number,
    firstName: string,
    lastName: string,
}

export type UpdateUserRequestResponseError = {
    firstName?: string
    lastName?: string
}

/*Initial Values*/
export const initialUserUpdatePayload:UpdateUserPayload = {
    id: 0,
    firstName: "",
    lastName: ""
} 

export const updateUser = async (payload: UpdateUserPayload, requestStatusHook?: RequestStatusHook) =>{
    return apiCall<UpdateUserPayload, User, UpdateUserRequestResponseError>(ApiCallType.PATCH, "/user", payload, requestStatusHook)
}