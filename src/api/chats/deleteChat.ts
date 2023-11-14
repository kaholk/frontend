
import { apiCall, ApiCallType, RequestStatusHookType } from "../axios"


export type DeleteChatPayload = {
    id: number
}

export const initialDeleteChatPayload: DeleteChatPayload = {
    id: 0
}

export type DeleteChatRequestError = string


export const deleteChat = async (payload: DeleteChatPayload = initialDeleteChatPayload, requestStatusHook?: RequestStatusHookType) =>{
    let url = `/chat/${payload.id}`
    return apiCall<undefined, unknown, DeleteChatRequestError>(ApiCallType.DELETE, url, undefined, requestStatusHook)
}