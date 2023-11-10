
import { apiPost, RequestStatusHook } from "../axios"
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
    return apiPost<LoginPayload, User, LoginRequestResponseError>("/user/login", payload, requestStatusHook)
}