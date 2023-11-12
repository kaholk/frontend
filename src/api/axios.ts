
import axios from "axios"
import { getDefaultStore, PrimitiveAtom } from "jotai"
import React from "react"

export const api = axios.create({
    baseURL: "https://chat-api.srym.pl",
    timeout: 1000 * 10
})

export enum RequestStatus {
    Idle = "Idle",
    Pending = "Pending",
    Error = "Error",
    Success = "Success"
}

export enum ApiCallType {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PATCH = "PATCH"
}

export type RequestStatusHook = React.Dispatch<React.SetStateAction<RequestStatus>> | undefined
export type RequestBaseError = string | null
export type RequestResponseError<RequuestResponseErrorType> = RequuestResponseErrorType | null

export type RequestResponse<ResponseType, RequuestResponseErrorType> = 
{
    status: false,
    responseError: RequestResponseError<RequuestResponseErrorType>,
    baseError: RequestBaseError
} |
{
    status: true,
    data: ResponseType
}



export const apiCall = async <PayloadType, ResponseType, RequestResponseErrorType> (callType: ApiCallType, url:string, payload?:PayloadType, requestStatusHook?: RequestStatusHook) =>{

    if(requestStatusHook != undefined) requestStatusHook(RequestStatus.Pending)
    try{
        const resoult = await api<ResponseType>({method: callType, url: url, data: payload})
        if(requestStatusHook != undefined) requestStatusHook(RequestStatus.Success)
        
        return {
            status: true,
            data: resoult.data
        } as RequestResponse<ResponseType, RequestResponseErrorType>
    }
    catch(error: any){
        if(requestStatusHook != undefined) requestStatusHook(RequestStatus.Error)
        if (error.response){
            return {
                status: false,
                responseError: error.response.data as RequestResponseErrorType,
                baseError: null
            } as RequestResponse<ResponseType, RequestResponseErrorType>
        }
        else{
            return {
                status: false,
                baseError: "Coś poszło nie tak",
                responseError: null
            } as RequestResponse<ResponseType, RequestResponseErrorType>
        }

    }
}