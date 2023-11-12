

import { apiCall, ApiCallType, RequestStatusHook } from "../axios"
import { Friend } from "../types"

/*Types*/
export type GetFirendsInvitesListPayload = {
    id: number
}

export type GetFirendsInvitesListRequestResponseError = {

}

/*Initial Values*/
export const initialGetFirendsInvitesListPayload:GetFirendsInvitesListPayload = {
    id: 0
}



export const getFirendsInvitesList = async (payload: GetFirendsInvitesListPayload = initialGetFirendsInvitesListPayload, requestStatusHook?: RequestStatusHook) =>{
    const url = `/friend/${payload.id}/invites`
    return apiCall<undefined, Friend[], GetFirendsInvitesListRequestResponseError>(ApiCallType.GET, url, undefined, requestStatusHook)
}