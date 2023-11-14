

import { apiCall, ApiCallType, RequestStatusHookType } from "../axios"
import { Friend } from "../types"

/*Types*/
export type GetFirendsInvitesListPayload = {
    id: number
}

export type GetFirendsInvitesListRequestError = {

}

/*Initial Values*/
export const initialGetFirendsInvitesListPayload:GetFirendsInvitesListPayload = {
    id: 0
}



export const getFirendsInvitesList = async (payload: GetFirendsInvitesListPayload = initialGetFirendsInvitesListPayload, requestStatusHook?: RequestStatusHookType) =>{
    const url = `/friend/${payload.id}/invites`
    return apiCall<undefined, Friend[], GetFirendsInvitesListRequestError>(ApiCallType.GET, url, undefined, requestStatusHook)
}