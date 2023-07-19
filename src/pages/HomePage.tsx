

// import { shallow } from 'zustand/shallow'
// import { useMessagesStore } from '../stores/messagesStore'

export const HomePage = () =>{
    // const [counter, increment] = useMessagesStore(state => [state.counter, state.increment], shallow)

    return(<>
        <h1 className="text-3xl font-bold underline">
            Hello world!
        </h1>
        {/* <button onClick={increment}>{counter}</button> */}
    </>)
}