

import { apiCall, ApiCallType, RequestStatusHook } from "../axios"


/*Types*/
export type UpdateUserPasswordPayload = {
    id: number,
    password: string
}

export type UpdateUserPasswordRequestResponseError = {
    password?: string
}

export type UpdateUserPasswordResponse = {
    id: number,
    message: string
}

/*Initial Values*/
const initialUpdateUserPasswordPayload:UpdateUserPasswordPayload = {
    id: 0,
    password: ""
}


export const updateUserPassword = async (payload: UpdateUserPasswordPayload = initialUpdateUserPasswordPayload, requestStatusHook?: RequestStatusHook) =>{
    return apiCall<UpdateUserPasswordPayload, UpdateUserPasswordResponse, UpdateUserPasswordRequestResponseError>(ApiCallType.PATCH, "/user/changePassword", payload, requestStatusHook)
}

