
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
// import { persist, createJSONStorage } from 'zustand/middleware'
import computed from "zustand-computed"
import { immer } from 'zustand/middleware/immer'

import { faker } from '@faker-js/faker';

import { TmessageProps } from '../components/Tmessage'


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



type State = {
    chats: Chat[];
    currentChatId: number;
    sendMessage: (message: TmessageProps) => void;
    selectChat: (chatId: number) => void;
}

type ComputedStore = {
  currentChat: Chat
}

// const computeState = (state: EmptyStore): ComputedStore => ({
//   // currentChat: state.chats.filter(e=>e.id == state.currentChatId)[0],
// })

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

// localforge
// https://github.com/rt2zz/redux-persist/issues/870#issuecomment-685145162

export const useMessagesStore = create<
State,
[
  ['zustand/devtools', never],
  // ['zustand/persist', State],
  ["chrisvander/zustand-computed", ComputedStore],
  ['zustand/immer', never],
]
>(devtools(/*persist(*/computed(immer((set) => ({
    chats: chatsMokup,
    currentChatId: chatsMokup[0].id,
    sendMessage: (message) =>{set(state=>{
      state.chats.filter(e=>e.id == state.currentChatId)[0].messages.push(message as Message)
    })},
    selectChat: (chatId)=>{set(state=>{
      state.currentChatId = state.chats.filter(e=>e.id == chatId)[0].id
    })}
  })
),(state)=>({
  currentChat: state.chats.filter(e=>e.id == state.currentChatId)[0],
}),{disableProxy: false}),/*{name: 'messagesStore', storage: createJSONStorage(()=> sessionStorage)}),*/{ name: "messagesStore"}))
