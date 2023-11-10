
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
    data: ResponseType | null
}



export const apiPost = async <PayloadType, ResponseType, RequestResponseErrorType>(url: string, payload:PayloadType, requestStatusHook?: RequestStatusHook) =>{

    let requestResponse:RequestResponse<ResponseType, RequestResponseErrorType> = {
        status: false,
        baseError: null,
        responseError: null
    };

    if(requestStatusHook != undefined) requestStatusHook(RequestStatus.Pending)

    try{
        const resoult = await api.post<ResponseType>(url, payload)
        if(requestStatusHook != undefined) requestStatusHook(RequestStatus.Success)

        return requestResponse = {
            status: true,
            data: resoult.data
        } 
    }
    catch(error: any){
        if(requestStatusHook != undefined) requestStatusHook(RequestStatus.Error)
        if (error.response){
            return requestResponse = {
                status: false,
                responseError: error.response.data as RequestResponseErrorType,
                baseError: null
            }
        }
        else{
            return requestResponse = {
                status: false,
                baseError: "Coś poszło nie tak",
                responseError: null
            }
        }
    }
}

export const apiPatch = async <PayloadType, ResponseType, RequestResponseErrorType>(url: string, payload:PayloadType, requestStatusHook?: RequestStatusHook) =>{

    let requestResponse:RequestResponse<ResponseType, RequestResponseErrorType> = {
        status: false,
        baseError: null,
        responseError: null
    };

    if(requestStatusHook != undefined) requestStatusHook(RequestStatus.Pending)

    try{
        const resoult = await api.patch<ResponseType>(url, payload)
        if(requestStatusHook != undefined) requestStatusHook(RequestStatus.Success)

        return requestResponse = {
            status: true,
            data: resoult.data
        } 
    }
    catch(error: any){
        if(requestStatusHook != undefined) requestStatusHook(RequestStatus.Error)
        if (error.response){
            return requestResponse = {
                status: false,
                responseError: error.response.data,
                baseError: null
            }
        }
        else{
            return requestResponse = {
                status: false,
                baseError: "Coś poszło nie tak",
                responseError: null
            }
        }
    }
}


export const apiGet = async <ResponseType, RequestResponseErrorType>(url: string, requestStatusHook?: RequestStatusHook) =>{
    if(requestStatusHook != undefined) requestStatusHook(RequestStatus.Pending)

    let requestResponse:RequestResponse<ResponseType, RequestResponseErrorType> = {
        status: false,
        baseError: null,
        responseError: null
    };

    try{
        const resoult = await api.get<ResponseType>(url)

        if(resoult.data == "")
            throw new Error("Empty")

        if(requestStatusHook != undefined) requestStatusHook(RequestStatus.Success)
        return requestResponse = {
            status: true,
            data: resoult.data
        }
    }
    catch(error:any){
        if(requestStatusHook != undefined) requestStatusHook(RequestStatus.Error)
        return requestResponse = {
            status: false,
            baseError: "Coś poszło nie tak",
            responseError: null
        }
    }
}


export const apiDelete = async <ResponseType, RequestResponseErrorType>(url: string, requestStatusHook?: RequestStatusHook) =>{
    if(requestStatusHook != undefined) requestStatusHook(RequestStatus.Pending)

    let requestResponse:RequestResponse<ResponseType, RequuestResponseError<RequestResponseErrorType>> = {
        status: false,
        baseError: null,
        responseError: null
    };

    try{
        const resoult = await api.delete<ResponseType>(url)

        // if(resoult.data == "")
        //     throw new Error("Empty")

        if(requestStatusHook != undefined) requestStatusHook(RequestStatus.Success)
        return requestResponse = {
            status: true,
            data: resoult.data
        }
    }
    catch(error:any){
        if(requestStatusHook != undefined) requestStatusHook(RequestStatus.Error)
        return requestResponse = {
            status: false,
            baseError: "Coś poszło nie tak",
            responseError: null
        }
    }
}



// export const apiPostJotai = async <PayloadType, ResponseType, ErrorMessageType>(url: string, payload: PayloadType, requestStatusAtom:PrimitiveAtom<RequestStatus>, requestErrorAtom: PrimitiveAtom<RequuestResponseError<ErrorMessageType>>) =>{
//     const store = getDefaultStore()
//     store.set(requestStatusAtom, RequestStatus.Pending);
//     try{
//         const resoult = await api.post<ResponseType>(url, payload)
//         store.set(requestStatusAtom, RequestStatus.Success);
//         return {
//             status: true,
//             data: resoult.data
//         } as RequestResponse<ResponseType>
//     }
//     catch(error:any){
//         store.set(requestStatusAtom, RequestStatus.Error);
//         if (error.response) store.set(requestErrorAtom, error.response.data);
//         else store.set(requestErrorAtom, {message: "coś poszło nie tak"});
//     }
//     return {
//         status: false
//     } as RequestResponse<ResponseType>
// }

// export const apiPatchJotai = async <PayloadType, ResponseType, ErrorMessageType>(url:string, payload: PayloadType, requestStatusAtom:PrimitiveAtom<RequestStatus>, requestErrorAtom: PrimitiveAtom<RequuestResponseError<ErrorMessageType>>) =>{
//     const store = getDefaultStore()
//     store.set(requestStatusAtom, RequestStatus.Pending);
//     try{
//         const resoult = await api.patch<ResponseType>(url, payload)
//         store.set(requestStatusAtom, RequestStatus.Success);
//         return {
//             status: true,
//             data: resoult.data
//         } as RequestResponse<ResponseType>
//     }
//     catch(error:any){
//         store.set(requestStatusAtom, RequestStatus.Error);
//         if (error.response) store.set(requestErrorAtom, error.response.data);
//         else store.set(requestErrorAtom, {message: "coś poszło nie tak"});
//     }
//     return {
//         status: false
//     } as RequestResponse<ResponseType>
// }


// export const apiGet = async <ResponseType>(url:string) =>{
//     try{
//         const resoult = await api.get<ResponseType>(url)
//         return {
//             status: true,
//             data: resoult.data
//         } as RequestResponse<ResponseType>
//     }
//     catch(error:any){

//     }
    
//     return {
//         status: false
//     } as RequestResponse<ResponseType>
// }