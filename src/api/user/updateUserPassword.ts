

import { apiPatch, RequestStatusHook } from "../axios"


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
    return apiPatch<UpdateUserPasswordPayload, UpdateUserPasswordResponse, UpdateUserPasswordRequestResponseError>("/user/changePassword", payload, requestStatusHook)
}

