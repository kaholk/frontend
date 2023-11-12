


import { Icon } from "@mdi/react"
import { mdiMagnify } from "@mdi/js"
import { useAtom } from "jotai"
import { useState } from "react";
import { searchUsers } from "../api/user/searchUser"
import { User } from "../api/types"
import { RequestStatus } from "../api/axios"

import { 
    currentUserFriendsInviteListAtom,
    currentUserFriendsListAtom
} from "../stores/currentUserAtoms"

export const TfriendsContainer = () =>{
    const [currentUserFriendsInviteList, _setCurrentUserFriendsInviteList] = useAtom(currentUserFriendsInviteListAtom)
    const [currentUserFriendsList, _setCurrentUserFriendsList] = useAtom(currentUserFriendsListAtom)

    const [searchUserList, setSearchUserList] = useState<User[]>([])
    const [searchUserListStatus, setSearchUserListStatus] = useState<RequestStatus>(RequestStatus.Idle);

    const searchCallback = async (search:string) =>{
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
            onInput={(e)=>searchCallback(e.currentTarget.value)}
            />
        </div>
        <div className="relative bg-base-200 rounded-xl grow">
            {
                searchUserListStatus == RequestStatus.Idle && <>
                {
                    currentUserFriendsInviteList.length > 0 &&
                    <div>
                        Zaproszenia do znjamoych:
                        {currentUserFriendsInviteList.map(friend=>
                            <div key={friend.friendId}>
                                <span>{friend.firstName}{friend.lastName}({friend.friendId})</span>
                                <button className="btn btn-sm btn-outline btn-primary ml-2">Zatwierdź</button>
                                <button className="btn btn-sm btn-outline btn-primary ml-2">Odrzuć</button>
                            </div>
                        )}
                    </div>
                }
                <div>
                    Twoi znajomi:
                    {currentUserFriendsList.map(firend=>
                    <div key={firend.friendId}>
                        <span>{firend.firstName}{firend.lastName}({firend.friendId})</span>
                        <button className="btn btn-sm btn-outline btn-primary ml-2">usun ze znajomych</button>
                    </div>
                    )}
                </div>
                </>
            }
            <div>
                { (searchUserListStatus == RequestStatus.Success && searchUserList.length == 0) 
                    ? <>Nic nie znaleziono</>
                    : <>
                        {searchUserList.map(user=>
                        <div key={user.id}>
                            <span>{user.firstName}{user.lastName}({user.id})</span>
                            <button className="btn btn-sm btn-outline btn-primary ml-2">dodaj do znajomych</button>
                        </div>
                        )}
                    </>
                }
            </div>
        </div>
    </div>
    </>)
}