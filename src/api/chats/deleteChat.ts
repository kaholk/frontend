
import { apiCall, ApiCallType, RequestStatusHook } from "../axios"


export type DeleteChatPayload = {
    id: number
}

export const initialDeleteChatPayload: DeleteChatPayload = {
    id: 0
}

export type DeleteChatRequestResponseError = string


export const deleteChat = async (payload: DeleteChatPayload = initialDeleteChatPayload, requestStatusHook?: RequestStatusHook) =>{
    let url = `/chat/${payload.id}`
    return apiCall<undefined, unknown, DeleteChatRequestResponseError>(ApiCallType.DELETE, url, undefined, requestStatusHook)
}