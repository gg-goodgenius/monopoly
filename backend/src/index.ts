import express from 'express';
import http from 'http';
import {Server} from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true,
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
    }
});


app.use('/', (req, res) => {
    res.json({
        response: 'ok'
    })
})

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(process.env.PORT ?? 3000, () => {
    console.log('listening on *:' + (process.env.PORT ?? 3000));
});