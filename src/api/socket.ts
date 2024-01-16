

/*vvvvvvvvvv socket.io*/
import { io } from "socket.io-client"
/*^^^^^^^^^^ socket.io*/

/*vvvvvvvvvv jotai*/
import { getDefaultStore } from 'jotai'
import { onlineUsersAtom } from "../stores/currentUserAtoms"
/*^^^^^^^^^^ jotai*/

import { Message, OnlineUser } from "../api/types"

export const socket = io("https://chat-ws.srym.pl");


// aktualnie zalogowani uzytkownicy
socket.on("getOnlineUsers", (onlineUsers:OnlineUser[]) => {
    console.log("onlineUsers", onlineUsers);

    const store = getDefaultStore();
    store.set(onlineUsersAtom, onlineUsers);
});


// odbior wiadomosci
socket.on("getMessage", (message:Message) => {
    console.log(message);
});