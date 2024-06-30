import { useState } from "react"
import { createContext } from "react"


export const AppContext = createContext()


export default function AppContextProvider({ children }) {
    const [room, setRoom] = useState("");
    const [createRoom, setCreateRoom] = useState("");
    const [user, setUser] = useState("")


    const value = {
        room,
        createRoom,
        setCreateRoom,
        setRoom,
        user,
        setUser,
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

}
