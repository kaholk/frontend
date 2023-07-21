

import { TmessagesContainer, SendMessageCallback } from "../components/TmessagesContainer"
import { TchatContainer, CreateNewChatCallback, SelectChatCallback, SearchCallback } from "../components/TchatContainer"

import { Tnavigation } from "../components/Tnavigation"

import { faker } from "@faker-js/faker"

import { useState } from "react";
import { chatsAtom, currentChatAtom, currentChatIdAtom, sendMessageAtom } from "../stores/messagesAtoms"
import { useAtom } from "jotai"

export const ChatsPage = () =>{
    const [chats] = useAtom(chatsAtom)
    const [currentChat] = useAtom(currentChatAtom)
    const [, setCurrentChatId] = useAtom(currentChatIdAtom)
    const [, sendMessage] = useAtom(sendMessageAtom)
    const [newChatModal, setNewChatModal] = useState(false)

    const sendNewMessage:SendMessageCallback = (newMessage) =>{
        sendMessage({
            message: newMessage,
            avatarUrl: faker.internet.avatar(),
            messageDirection: "right",
            messageStatus: "xd",
            owner: "xxx",
            sendDate: "2023-05-02"
        })
    }

    const onSelectChat:SelectChatCallback = (chatId) =>{
        setCurrentChatId(chatId)
        // setCurrentChat({...currentChat, title: 'sobol jebie'})
    }

    const createNewChat:CreateNewChatCallback = () =>{
        // (window as any)[newChatModalId].showModal()
        setNewChatModal(true)
        // const randomWord = faker.word.words({count: 4})
        // setXd(randomWord)
    }

    const searchChats:SearchCallback = (value) =>{
        console.log(value)
    }

    return (<>
    <div className="flex flex-row justify-between p-4 h-full">
        <div className="flex flex-col h-full w-1/3 mr-4">
            <Tnavigation />
            <br />
            <TchatContainer chats={chats} currentChatId={currentChat?.id} createNewChatCallback={createNewChat} selectChatCallback={onSelectChat} searchCallback={searchChats}/>
        </div>
        <div className="flex flex-col h-full grow">
            <TmessagesContainer messages={currentChat?.messages} avatarUrl={currentChat?.avatarUrl} chatName={currentChat?.title} sendMessageCallback={sendNewMessage}/>
        </div>
        <dialog className={`modal ${newChatModal ? "modal-open" : "" }`}>
            <div className="modal-box w-11/12 max-w-3xl">
                <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2" onClick={() => setNewChatModal(false)}>X</button>
                <h3 className="font-bold text-lg">Create New Chat!</h3>
                <div className="divider" />
                <div>
                    <input type="text" placeholder="chat name" className="input input-bordered input-primary w-full" />
                </div>
                <div className="modal-action">
                    <button className="btn btn-primary rounded-xl">Create new chat</button>
                </div>
            </div>
        </dialog>
    </div>
    
    </>)
}