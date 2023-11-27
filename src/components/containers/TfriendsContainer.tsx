
/*vvvvvvvvvv react*/
import { useState } from "react"
/*^^^^^^^^^^ react*/

/*vvvvvvvvvv jotai*/
import { useAtom } from "jotai"
/*^^^^^^^^^^ jotai*/

/*vvvvvvvvvv icons*/
import { Icon } from "@mdi/react"
import { mdiMagnify } from "@mdi/js"
/*^^^^^^^^^^ icons*/

/*vvvvvvvvvv api*/
import { User } from "../../api/types"
import { RequestStatus, RequestResponseError } from "../../api/axios"
import { searchUsers } from "../../api/user/searchUser"
import { sendInvite, SendInviteRequestError } from "../../api/friends/sendInvite"
import { acceptInvite, AcceptInviteRequestError } from "../../api/friends/acceptInvite"
import { rejectInvite, RejectInviteRequestError} from "../../api/friends/rejectInvite"
import { deleteFriend, DeleteFriendRequestError} from "../../api/friends/deleteFriend"
/*^^^^^^^^^^ api*/

/*vvvvvvvvvv store*/
import { 
    friendsInviteListAtom,
    friendsListAtom,
    userAtom,
} from "../../stores/currentUserAtoms"
/*^^^^^^^^^^ store*/

// friends container component
export const TfriendsContainer = () =>{

    // store variables
    const [currentUserFriendsInviteList, _setCurrentUserFriendsInviteList] = useAtom(friendsInviteListAtom)
    const [currentUserFriendsList, _setCurrentUserFriendsList] = useAtom(friendsListAtom)
    const [currentUser, _setCurrentUser] = useAtom(userAtom)

    /*vvvvvvvvvv variables and methods used to track and trigger a request to search users*/
    const [searchUserList, setSearchUserList] = useState<User[]>([])
    const [searchUserListStatus, setSearchUserListStatus] = useState<RequestStatus>(RequestStatus.Idle);
    const fetchSearchUsers = async (search:string) =>{
        if(search.length <= 2){
            setSearchUserListStatus(RequestStatus.Idle);
            setSearchUserList([]);
            return;
        };
        if(searchUserListStatus == RequestStatus.Pending) return;

        const resoult = await searchUsers({keyword: search}, setSearchUserListStatus)
        if(resoult.status){
            setSearchUserList(resoult.data)
        }
    }
    /*^^^^^^^^^^ variables and methods used to track and trigger a request to search users*/


    /*vvvvvvvvvv variables and methods used to track and trigger a request to send invie*/
    const [sendInviteFriendId, setSendInviteFriendId] = useState<number | null>(null);
    const [sendInviteStatus, setSendInviteStatus] = useState<RequestStatus>(RequestStatus.Idle);
    const [sendInviteError, setSendInviteError] = useState<RequestResponseError<SendInviteRequestError>>(null);
    const fetchSendInvite = async (friendId: number) =>{
        
        // reset values
        setSendInviteStatus(RequestStatus.Idle);
        setSendInviteError(null);

        // initialize values
        setSendInviteFriendId(friendId)

        // if user is not login
        if(currentUser == null){
            setSendInviteStatus(RequestStatus.Error);
            setSendInviteError({baseError: "użytkwnik nie jest zalogowany", error: null});
            return;
        }

        // try send invite
        const resoult = await sendInvite({userId: currentUser.id, friendId:friendId}, setSendInviteStatus);

        // if error while sending invite
        if(resoult.status == false){
            setSendInviteError(resoult.data);
            return;
        }

        // successs

    }
    /*^^^^^^^^^^ variables and methods used to track and trigger a request to send invie*/


    /*vvvvvvvvvv variables and methods used to track and trigger a request to accept invie*/
    const [accpetInviteFriendId, setAccpetInviteFriendId] = useState<number | null>(null);
    const [accpetInviteStatus, setAccpetInviteStatus] = useState<RequestStatus>(RequestStatus.Idle);
    const [accpetInviteError, setAccpetInviteError] = useState<RequestResponseError<AcceptInviteRequestError>>(null);
    const fetchAcceptInvite = async (friendId:number) => {
        
        // reset values
        setAccpetInviteStatus(RequestStatus.Idle);
        setAccpetInviteError(null);

        // initialize values
        setAccpetInviteFriendId(friendId);

        // if user is not login
        if(currentUser == null){
            setSendInviteStatus(RequestStatus.Error);
            setSendInviteError({baseError: "użytkwnik nie jest zalogowany", error: null});
            return;
        }

        // try to accpet invite
        const resoult = await acceptInvite({userId: currentUser.id, friendId: friendId});

        // if error while accept invite
        if(resoult.status == false){
            setAccpetInviteError(resoult.data);
            return;
        }

        // success
    }
    /*^^^^^^^^^^ variables and methods used to track and trigger a request to accept invie*/

    /*vvvvvvvvvv variables and methods used to track and trigger a request to reject invie*/
    const [rejectInviteFriendId, setRejectInviteFriendId] = useState<number | null>(null);
    const [rejectInviteStatus, setRejectInviteStatus] = useState<RequestStatus>(RequestStatus.Idle);
    const [rejectInviteError, setRejectInviteError] = useState<RequestResponseError<RejectInviteRequestError>>(null);
    const fetchRejectInvite = async (firendId:number) =>{

        // reset values
        setRejectInviteStatus(RequestStatus.Idle);
        setRejectInviteError(null);

        // initialize values
        setRejectInviteFriendId(firendId);

        // if user is not login
        if(currentUser == null){
            setSendInviteStatus(RequestStatus.Error);
            setSendInviteError({baseError: "użytkwnik nie jest zalogowany", error: null});
            return;
        }

        // try to reject invite
        const resoult = await rejectInvite({userId: currentUser.id, friendId: firendId});

        // if error while reject invite
        if(resoult.status == false){
            setRejectInviteError(resoult.data);
            return;
        }

        // success
    }
    /*^^^^^^^^^^ variables and methods used to track and trigger a request to reject invie*/

    /*vvvvvvvvvv variables and methods used to track and trigger a request to delete friend*/
    const [deleteFriendId, setDeleteFriendId] = useState<number | null>(null);
    const [deleteFirendStatus, setDeleteFirendStatus] = useState<RequestStatus>(RequestStatus.Idle);
    const [deleteFirendError, setDeleteFirendError] = useState<RequestResponseError<RejectInviteRequestError>>(null);
    const fetchDeleteFriend = async (firendId:number) =>{

        //reset values
        setDeleteFirendStatus(RequestStatus.Idle);
        setDeleteFirendError(null);

        // initialize values
        setDeleteFriendId(firendId);

        // if user is not login
        if(currentUser == null){
            setSendInviteStatus(RequestStatus.Error);
            setSendInviteError({baseError: "użytkwnik nie jest zalogowany", error: null});
            return;
        }

        // try to delete friend
        const resoult = await deleteFriend({userId: currentUser.id, friendId: firendId}, setDeleteFirendStatus);

        // if error while deleting friend
        if(resoult.status == false){
            setDeleteFirendError(resoult.data);
            return;
        }

        // success
    }
    /*^^^^^^^^^^ variables and methods used to track and trigger a request to delete friend*/


    return(<>
    <div className="flex flex-col grow">
        <div className="relative text-gray-600 focus-within:text-gray-400 mb-6">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                    <Icon path={mdiMagnify} size={1}/>
                </button>
            </span>
            <input 
            type="text"
            placeholder="Search"
            className="input w-full pl-10 bg-base-200"
            onInput={(e)=>fetchSearchUsers(e.currentTarget.value)}
            />
        </div>
        <div className="relative bg-base-200 rounded-xl grow">
            <div>
                {
                    searchUserListStatus != RequestStatus.Idle &&
                    <>Szukaj znajomych:</>
                }
                { (searchUserListStatus == RequestStatus.Success && searchUserList.length == 0) 
                    ? <>Nic nie znaleziono</>
                    : <>
                        {searchUserList.map(user=>
                        <div key={user.id}>
                            <span>{user.firstName}{user.lastName}({user.id})</span>
                            <button className={`btn btn-sm btn-outline btn-primary ml-2 ${searchUserListStatus == RequestStatus.Pending && "btn-disabled"}`} onClick={()=>fetchSendInvite(user.id)}>
                                {(sendInviteStatus == RequestStatus.Pending && user.id == sendInviteFriendId) && <span className="loading loading-spinner"/>}
                                Dodaj do znajomych
                            </button>
                        </div>
                        )}
                    </>
                }
            </div>
            {
                currentUserFriendsInviteList.length > 0 &&
                <div>
                    Zaproszenia do znjamoych:
                    {currentUserFriendsInviteList.map(friend=>
                        <div key={friend.friendId}>
                            <span>{friend.firstName}{friend.lastName}({friend.friendId})</span>
                            <button className={`btn btn-sm btn-outline btn-primary ml-2 ${accpetInviteStatus == RequestStatus.Pending && "btn-disabled"}`} onClick={()=>fetchSendInvite(friend.friendId)}>
                                {(accpetInviteStatus == RequestStatus.Pending && friend.friendId == accpetInviteFriendId) && <span className="loading loading-spinner"/>}
                                Zatwierdź
                            </button>
                            <button className={`btn btn-sm btn-outline btn-primary ml-2 ${rejectInviteStatus == RequestStatus.Pending && "btn-disabled"}`} onClick={()=>fetchRejectInvite(friend.friendId)}>
                                {(rejectInviteStatus == RequestStatus.Pending && friend.friendId == rejectInviteFriendId) && <span className="loading loading-spinner"/>}
                                Odrzuć
                            </button>
                        </div>
                    )}
                </div>
            }
            <div>
                Twoi znajomi:
                {currentUserFriendsList.map(friend=>
                <div key={friend.friendId}>
                    <span>{friend.firstName}{friend.lastName}({friend.friendId})</span>
                    <button className={`btn btn-sm btn-outline btn-primary ml-2 ${deleteFirendStatus == RequestStatus.Pending && "btn-disabled"}`} onClick={()=>fetchDeleteFriend(friend.friendId)}>
                        {(deleteFirendStatus == RequestStatus.Pending && friend.friendId == deleteFriendId) && <span className="loading loading-spinner"/>}
                        Usun ze znajomych
                    </button>
                </div>
                )}
            </div>
  
        </div>
    </div>
    </>)
}