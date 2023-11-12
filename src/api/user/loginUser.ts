
import { apiCall, ApiCallType, RequestStatusHook } from "../axios"
import { User } from "../types"



/*Types*/
export type LoginPayload = {
    email: string;
    password: string;
}

export type LoginRequestResponseError = {
    message:{
        email?: string;
        password?: string;
    }
}


/*Initial Values*/
export const initialLoginPayload:LoginPayload = {email: '', password: ''} 


/*Methods*/
export const userLogin = async (payload: LoginPayload = initialLoginPayload, requestStatusHook?: RequestStatusHook) =>{
    return apiCall<LoginPayload, User, LoginRequestResponseError>(ApiCallType.POST, "/user/login", payload, requestStatusHook)
}