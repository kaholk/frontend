

import { apiGet, RequestStatusHook } from "../axios"
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
    return apiGet<Friend[], GetFirendsInvitesListRequestResponseError>(url, requestStatusHook)
}