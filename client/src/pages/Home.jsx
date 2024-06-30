import React from 'react'
import { AppContext } from '../context/AppContextProvider'
import { v4 as uuid } from "uuid"
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import io from 'socket.io-client'

const socket = io.connect(import.meta.env.VITE_BASE_URL)

export default function Home() {
    const { room, setRoom, createRoom, setCreateRoom, user, setUser } = useContext(AppContext)
    const navigate = useNavigate()

    const makeRoom = async () => {
        const randomId = uuid()
        setCreateRoom(randomId)

        navigate(`/room/${randomId}`)

    }
    const joinRoom = async () => {
        setRoom(room)

        navigate(`/room/${room}`)
    }

    return (
        <div>
            <h1>Create a room or join a room</h1>
            <div className="mt-4">
                <div>
                    <input type='text' value={user} placeholder='user id' onChange={(e) => setUser(e.target.value)}></input>
                </div>
                <div>
                    <input type="text" value={room} placeholder="enter room id" onChange={(e) => setRoom(e.target.value)} className=' border-2 p-2 rounded-lg mr-2' />
                    <button onClick={joinRoom}>Join Room</button>

                </div>
                <div>
                    <input type="text" value={createRoom} placeholder='random room id' className=' border-2 p-2 rounded-lg mr-2 mt-2' />
                    <button onClick={makeRoom}>create room</button>
                </div>
            </div>

        </div>
    )
}
