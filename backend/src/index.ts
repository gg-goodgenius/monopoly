import express from 'express';
import http from 'http';
import {Server} from "socket.io";
import {createClient} from "redis";

const redis = createClient();

const app = express();
const server = http.createServer(app);

interface ServerToClientEvents {
    room: (e: any) => void,
    updateCurrentOnline: (countOnline: number) => void
}

interface ClientToServerEvents {
    room: () => void
}

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
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

let countOnline = 0;

io.on('connection', async (socket) => {
    countOnline += 1;
    socket.broadcast.emit('updateCurrentOnline', countOnline);
    console.log('a user connected', socket.id);

    socket.on('disconnect', async () => {
        countOnline -= 1;
        console.log('a user disconnected', socket.id);
        socket.broadcast.emit('updateCurrentOnline', countOnline);
    })

    socket.on('room', () => {
        socket.emit('room', {name: 'test'});
    });
});

server.listen(process.env.PORT ?? 3000, async () => {
    await redis.connect();
    console.log('listening on *:' + (process.env.PORT ?? 3000));
});