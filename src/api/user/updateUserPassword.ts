

import { apiCall, ApiCallType, RequestStatusHookType } from "../axios"


/*Types*/
export type UpdateUserPasswordPayload = {
    id: number,
    password: string
}

export type UpdateUserPasswordRequestError = {
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


export const updateUserPassword = async (payload: UpdateUserPasswordPayload = initialUpdateUserPasswordPayload, requestStatusHook?: RequestStatusHookType) =>{
    return apiCall<UpdateUserPasswordPayload, UpdateUserPasswordResponse, UpdateUserPasswordRequestError>(ApiCallType.PATCH, "/user/changePassword", payload, requestStatusHook)
}

