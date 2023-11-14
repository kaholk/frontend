
import axios from "axios"
import React from "react"

// create axios instance
export const api = axios.create({
    baseURL: "https://chat-api.srym.pl",
    timeout: 1000 * 10
})

// possible request statuses
export enum RequestStatus {
    Idle = "Idle",
    Pending = "Pending",
    Error = "Error",
    Success = "Success"
}

// possible request api call types
export enum ApiCallType {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PATCH = "PATCH"
}

// request status hook used to update request status
export type RequestStatusHookType = React.Dispatch<React.SetStateAction<RequestStatus>> | undefined

// request response error type used in api calls
export type RequestResponseError<RequuestResponseErrorType> = {
    error: RequuestResponseErrorType | null
    baseError: string | null
} | null

// request response type used in api calls
export type RequestResponse<ResponseType, RequuestResponseErrorType> = 
{
    status: false,
    data: RequestResponseError<RequuestResponseErrorType>
} |
{
    status: true,
    data: ResponseType
}



export const apiCall = async <PayloadType, ResponseType, RequestResponseErrorType> (callType: ApiCallType, url:string, payload?:PayloadType, requestStatusHook?: RequestStatusHookType) =>{

    // update request status if possible
    if(requestStatusHook != undefined) requestStatusHook(RequestStatus.Pending);

    try{

        // try make request
        const resoult = await api<ResponseType>({method: callType, url: url, data: payload});

        // update request status if possible
        if(requestStatusHook != undefined) requestStatusHook(RequestStatus.Success);
        
        // if request success
        return {
            status: true,
            data: resoult.data
        } as RequestResponse<ResponseType, RequestResponseErrorType>
    }
    catch(error: any){

        // update request status if possible
        if(requestStatusHook != undefined) requestStatusHook(RequestStatus.Error);

        // if request fail, but serwer return response
        if (error.response){
            return {
                status: false,
                data: {
                    baseError: null,
                    error: error.response.data
                }
            } as RequestResponse<ResponseType, RequestResponseErrorType>
        }

        // else if request fail and serwer not return response
        else{
            return {
                status: false,
                data: {
                    baseError: "Coś poszło nie tak",
                    error: null
                }
            } as RequestResponse<ResponseType, RequestResponseErrorType>
        }

    }
}