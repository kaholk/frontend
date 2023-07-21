



import localforage from 'localforage';



export class MainStorage<Value>{
    private local: LocalForage

    constructor(){
        this.local = localforage.createInstance({
            driver: localforage.INDEXEDDB,
            name: "defaultStore",
            storeName: "default",
            description: "default description"
        })
    }
    async getItem(key:string, initValue:Value):Promise<Value>{
        console.log({status: "get", key: key, value: initValue})

        const value = await this.local.getItem<Value>(key)
        if(value == null)
            return initValue
        else return value
    }
    async setItem(key:string, value:Value):Promise<void>{
        console.log({status: "set", key: key, value: value})
        await this.local.setItem<Value>(key, value)
    }
    async removeItem(key:string):Promise<void>{
        await this.local.removeItem(key)
    }
}

// export const mainStorage = new MainStorage()