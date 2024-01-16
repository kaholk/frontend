

export type User = {
    id: number,
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
}

export type Friend = {
    friendId: number;
    firstName: string;
    lastName: string;
}

export type Chat = {
    id: number;
    name: string;
    lastMessage: string;
    lastMessageNickname: string;
}

export type ChatMember = {
    userId: number;
    nickname: string;
    createdAt: string;
}

export type ChatDetail = {
    id: number;
    name: string;
    multichat: boolean;
    createdAt: string;
    chatMembers: ChatMember[];
}

export type Message = {
    // id: number;
    chatId: number;
    userId: number;
    message: string;
    messageTypeId: number;
    // createdAt: string;
}

export type OnlineUser = unknown