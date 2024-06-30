
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import io from "socket.io-client"
import { useContext } from "react"
import { AppContext } from "../context/AppContextProvider"


const socket = io.connect(import.meta.env.VITE_BASE_URL)

export default function Chat() {
    const params = useParams()
    const { user } = useContext(AppContext)
    const [msg, setMsg] = useState("")
    const [receivedMsg, setReceivedMsg] = useState([{ message: "", room: "", user: "" }])
    // const [room, setRoom] = useState("")
    // const [user, setUser] = useState("")


    const sendMsg = async () => {
        socket.emit("send-message", { message: msg, room: params.id, user })

        setReceivedMsg((prev) => {
            return [...prev, { message: msg, room: params.id, user }]
        })
        setMsg("")

    }


    useEffect(() => {
        socket.emit("join-room", params.id)
        socket.on("receive-message", (data) => {
            console.log("this is data", data)
            setReceivedMsg((prev) => {
                return [...prev, data]
            })
        })

    }, [socket])


    return (
        <div>
            <div>
                <input type="text" placeholder='msg' value={msg} onChange={(e) => setMsg(e.target.value)} />
                <button onClick={sendMsg}>send msg</button>
            </div>


            <div>
                {receivedMsg.map((el) => {
                    return <p style={{ marginRight: `${el.user !== user && "20px"}` }}>{el.message}</p>
                })}
            </div>
        </div>)

}
