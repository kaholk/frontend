
/*vvvvvvvvvv react*/
import { useState } from "react"
/*^^^^^^^^^^ react*/

/*vvvvvvvvvv jotai*/
import { useAtom } from "jotai"
/*^^^^^^^^^^ jotai*/

/*vvvvvvvvvv api*/
import { RequestStatus, RequestResponseError } from "../../api/axios"
import { updateUserPassword, UpdateUserPasswordRequestError} from "../../api/user/updateUserPassword"
import { updateUser, UpdateUserRequestError } from "../../api/user/updateUser"
/*vvvvvvvvvv api*/


/*vvvvvvvvvv store*/
import { 
    // variables
    userAtom,
} from "../../stores/currentUserAtoms"
/*^^^^^^^^^^ store*/

export const TsettingsContainer = () =>{

    // store variables
    

    return(<>
    <div className="flex flex-col grow">
        <div className="relative bg-base-200 rounded-xl grow">
            Ustawienia
        </div>
    </div>
    </>)
}