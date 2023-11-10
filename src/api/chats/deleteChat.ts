
import { RequestStatusHook, apiGet } from "../axios"


export type DeleteChatPayload = {
    id: number
}

export const initialDeleteChatPayload: DeleteChatPayload = {
    id: 0
}

export type DeleteChatRequestResponseError = string


export const deleteChat = async (payload: DeleteChatPayload = initialDeleteChatPayload, requestStatusHook?: RequestStatusHook) =>{

}