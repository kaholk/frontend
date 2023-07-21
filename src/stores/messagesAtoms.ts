

import { atom } from 'jotai'
// import { splitAtom } from "jotai/utils"
// import { atomWithStorage } from 'jotai/utils'
// import {  MainStorage }  from "./MainStorage"


import { faker } from '@faker-js/faker';

export type Message = {
    message: string,
    avatarUrl: string,
    owner: string,
    messageDirection: "left" | "right"
    sendDate: string,
    messageStatus: string,
}
  
export type Chat = {
    id: number,
    title: string,
    avatarUrl: string,
    desc: string,
    status: string,
    messages: Message[]
}

const chatsMokup = Array(100).fill("").map((_e, idx)=>({
    id: faker.number.int(),
    title: `${idx}.` + faker.lorem.words({max: 5, min: 1}),
    avatarUrl: faker.image.avatar(),
    desc: faker.lorem.words({max: 10, min: 1}),
    status: faker.lorem.words({max: 3, min: 1}),
    messages: Array(faker.number.int({min: 1, max: 300})).fill("").map((_e, idx)=>({
      message: `${idx}. ` + faker.lorem.words({max: 40, min: 1}), 
      avatarUrl: faker.image.avatar(),
      owner: faker.person.firstName(),
      messageDirection: faker.helpers.arrayElement(["left", "right"]),
      sendDate: faker.date.anytime({}).toDateString(),
      messageStatus: "readed"
    } satisfies Message) )
  } satisfies Chat))



// export const xdAtom = atomWithStorage("xd", "", new MainStorage())

export const chatsAtom = atom<Chat[]>(chatsMokup)
// export const chatsAtom = atomWithStorage<Chat[]>("chats", chatsMokup, new MainStorage())

export const currentChatIdAtom = atom<Number>(chatsMokup[0].id)
export const currentChatAtom = atom(
    (get) => get(chatsAtom).find(e=>e.id == get(currentChatIdAtom)) || {} as Chat,

    (get, set,  newChat:Chat) => {
        // call api
        // change localy
        set(chatsAtom, get(chatsAtom).map(e => e.id == newChat.id ? newChat : e))
    }
)

export const sendMessageAtom = atom(
    null,
    (get, _set, message:Message) => {
        get(currentChatAtom)?.messages.push(message)
    }
)



// type MessageFramgnet = {
//     type: "text" | "image" 
//     value: 
// }