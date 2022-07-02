import express from 'express';
import http from 'http';
import {Server} from "socket.io";
import {createClient} from "redis";
import {fields} from "./contatnts";
import {ClientToServerEvents, ServerToClientEvents} from "./types/socket";
import {Game, StatusGame} from "./types/game";

const redis = createClient();

const app = express();
const server = http.createServer(app);

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

let game: Game = {
    fields: fields,
    users: [],
    bank: {},
    status: StatusGame.WAITING
};
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

    socket.on('getCurrentOnline', () => {
        io.sockets.emit('updateCurrentOnline', countOnline);
    });


    socket.on('joinGame', async (address) => {
        if(game.status === StatusGame.PROCESS) return socket.emit('error', 'The game has already started.');

        if(game.users.findIndex(u => u.address == address) === -1) {
            game.users.push({
                address: address,
                balance: 0,
                position: 0
            });
            socket.join('game');
            io.to('game').emit('updateGame', game);
        }
    });

    socket.on('startGame', async () => {
        if(game.users.length > 1) {
            game.status = StatusGame.PROCESS;
            io.to('game').emit('updateGame', game);
        } else
            return socket.emit('error', 'Very few people')
    })

});

server.listen(process.env.PORT ?? 3000, async () => {
    await redis.connect();
    console.log('listening on *:' + (process.env.PORT ?? 3000));
});