

import { TchatProps, Tchat, TchatOnClickCallback } from "./Tchat"
import { Components, Virtuoso, ItemProps } from 'react-virtuoso'
import { Icon } from "@mdi/react"
import { mdiMagnify, mdiPlus } from "@mdi/js"
import React from "react"



export type CreateNewChatCallback = () => void
export type SelectChatCallback = TchatOnClickCallback


export type TchatContainerProps = {
    chats: TchatProps[];
    currentChatId?: number;
    createNewChatCallback?: CreateNewChatCallback;
    selectChatCallback?: SelectChatCallback;
}

type VirtuosoContext = {
    context?: {currentChatId: number}
}



const customItem: Components<TchatProps, VirtuosoContext["context"]>['Item'] = React.forwardRef<HTMLDivElement, ItemProps<TchatProps> & VirtuosoContext>(({item, context, ...props} , ref) =>  {
    return (
        <div 
            {...props}
            ref={ref} 
            key={item.id}
            className={`cursor-pointer px-2 pt-1 ${context?.currentChatId == item.id ? "bg-transparent/40" : "hover:bg-transparent/20"}`}
        />
    )
})

export const TchatContainer = ({
        chats,
        createNewChatCallback = () => {},
        selectChatCallback = () => {},
        currentChatId = -1
    }:TchatContainerProps) =>{

    return(<>
    <div className="flex flex-col grow">
        <div className="relative text-gray-600 focus-within:text-gray-400 mb-6">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                    <Icon path={mdiMagnify} size={1}/>
                </button>
            </span>
            <input type="text" placeholder="Search" className="input w-full pl-10 bg-base-200" />
        </div>
        <div className="relative bg-base-200 rounded-xl grow">
            <Virtuoso 
                className='no-scrollbar'
                totalCount={chats.length}
                data={chats}
                components={{Item: customItem}}
                context={{currentChatId: currentChatId}}
                itemContent={(idx, chat) => (<>
                    <Tchat 
                        id={chat.id} 
                        title={chat.title} 
                        desc={chat.desc} 
                        avatarUrl={chat.avatarUrl} 
                        status={chat.status} 
                        onClickCallback={selectChatCallback}
                    />
                    { idx < chats.length-1 ? <div className="divider m-0"/> : null }
                </>)}
            />
            <button className="btn btn-primary rounded-xl absolute right-6 bottom-5" onClick={createNewChatCallback}>
                <Icon path={mdiPlus} size={1}/>
            </button>
        </div>
    </div>
    </>)
}