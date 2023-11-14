
import { apiCall, ApiCallType, RequestStatusHookType} from "../axios"
import { User } from "../types"


/*Types*/
export type RegisterPayload = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export type RegisterRequestError = {
    message: {
        email?: string;
        firstName?: string;
        lastName?: string;
        password?: string;
    }
}

export const initialRegisterRequestResponseError: RegisterRequestError = {
    message:{
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    }
}

/*Initial Values*/
export const initialRegisterPayload:RegisterPayload = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
} 

export const registerUser = async (payload: RegisterPayload = initialRegisterPayload, requestStatusHook?: RequestStatusHookType) =>{
    return apiCall<RegisterPayload, User, RegisterRequestError>(ApiCallType.POST, "/user", payload, requestStatusHook)
}