const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors")


app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "https://socketdemomsg.vercel.app",
        methods: ["GET", "POST"]
    }

})
app.get("/", (req, res) => {
    res.send("hello")
})

io.on("connection", (socket) => {
    console.log(`user connected with id ${socket.id}`)
    socket.on("join-room", (data) => {
        console.log("this is data", data)
        socket.join(data);
    })
    socket.on("send-message", (data) => {
        console.log(data)
        socket.to(data.room).emit("receive-message", data)
    })

})


server.listen(8000, () => {
    console.log(`listening on server 8000`)
})
