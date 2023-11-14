
import { apiCall, ApiCallType, RequestStatusHookType } from "../axios"
import { User } from "../types"



/*Types*/
export type LoginPayload = {
    email: string;
    password: string;
}

// export type LoginRequestResponseError = {
//     message:{
//         email?: string;
//         password?: string;
//     }
// }
export type LoginRequestError = {
    message:{
        email?: string;
    } | string
}


/*Initial Values*/
export const initialLoginPayload:LoginPayload = {email: '', password: ''} 


/*Methods*/
export const userLogin = async (payload: LoginPayload = initialLoginPayload, requestStatusHook?: RequestStatusHookType) =>{
    return apiCall<LoginPayload, User, LoginRequestError>(ApiCallType.POST, "/user/login", payload, requestStatusHook)
}