

import { TmessagesContainer, SendMessageCallback } from "../components/TmessagesContainer"
import { TchatContainer, CreateNewChatCallback, SelectChatCallback } from "../components/TchatContainer"

import { Tnavigation } from "../components/Tnavigation"


// import { useMessagesStore } from "../stores/messagesStore"
// import { shallow } from "zustand/shallow"
import { faker } from "@faker-js/faker"

import { chatsAtom, currentChatAtom, currentChatIdAtom, sendMessageAtom } from "../stores/atoms"
import { useAtom } from "jotai"

export const ChatsPage = () =>{
    // const [chats, currentChat, sendMessage, selectChat] = useMessagesStore( state=> [state.chats, state.currentChat, state.sendMessage, state.selectChat], shallow)
    const [chats] = useAtom(chatsAtom)
    const [currentChat] = useAtom(currentChatAtom)
    const [, setCurrentChatId] = useAtom(currentChatIdAtom)
    const [, sendMessage] = useAtom(sendMessageAtom)

    const sendNewMessage:SendMessageCallback = (newMessage) =>{
        sendMessage({
            message: newMessage,
            avatarUrl: faker.internet.avatar(),
            messageDirection: "right",
            messageStatus: "xd",
            owner: "xd",
            sendDate: "2023-05-01"
        })
    }

    const onSelectChat:SelectChatCallback = (chatId) =>{
        setCurrentChatId(chatId)
        // setCurrentChat({...currentChat, title: 'sobol jebie'})
    }

    const createNewChat:CreateNewChatCallback = () =>{
        // console.log("nee chat")
    }

    return (<>
    <div className="flex flex-row justify-between p-4 h-full">
        <div style={{width: "40%"}} className="flex flex-col h-full">
            <Tnavigation />
            <br />
            <TchatContainer chats={chats} currentChatId={currentChat?.id} createNewChatCallback={createNewChat} selectChatCallback={onSelectChat}/>
        </div>
        <div style={{width: "59%"}} className="flex flex-col h-full">
            <TmessagesContainer messages={currentChat?.messages} avatarUrl={currentChat?.avatarUrl} chatName={currentChat?.title} sendMessageCallback={sendNewMessage}/>
        </div>
    </div>
    
    </>)
}