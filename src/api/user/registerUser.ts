
import { apiPost, RequestStatusHook} from "../axios"
import { User } from "../types"


/*Types*/
export type RegisterPayload = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export type RegisterRequestResponseError = {
    message: {
        email?: string;
        firstName?: string;
        lastName?: string;
        password?: string;
    }
}

export const initialRegisterRequestResponseError: RegisterRequestResponseError = {
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

export const registerUser = async (payload: RegisterPayload = initialRegisterPayload, requestStatusHook?: RequestStatusHook) =>{
    return apiPost<RegisterPayload, User, RegisterRequestResponseError>("/user", payload, requestStatusHook)
}