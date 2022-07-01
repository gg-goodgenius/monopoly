import express from 'express';
import http from 'http';
import {Server} from "socket.io";
import {createClient} from "redis";

const redis = createClient();

const app = express();
const server = http.createServer(app);

interface ServerToClientEvents {
    room: (e: any) => void
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


io.on('connection', async (socket) => {
    console.log('a user connected');
    await redis.hSet('online', socket.id, 0);

    socket.on('disconnect', async () => {
        await redis.hDel('online', socket.id)
    })

    socket.on('room', () => {
        socket.emit('room', {name: 'test'});
    });

});

server.listen(process.env.PORT ?? 3000, async () => {
    await redis.connect();
    console.log('listening on *:' + (process.env.PORT ?? 3000));
});