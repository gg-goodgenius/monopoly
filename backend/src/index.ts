import express from 'express';
import http from 'http';
import {Server} from "socket.io";
import {createClient} from "redis";
import {fields} from "./contatnts";
import {ClientToServerEvents, ServerToClientEvents} from "./types/socket";
import {Game, StatusGame, Step} from "./types/game";

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
    status: StatusGame.WAITING,
};
let step: Step | null = null;
let countOnline = 0;

io.on('connection', async (socket) => {
    const address = socket.handshake.query.address as string;
    if(!address)
        return socket.disconnect(true);

    countOnline += 1;

    if(game.status === StatusGame.PROCESS) {
        const i = game.users.findIndex(u => u.address === address);
        if(i > -1) {
            game.users[i].socketId = socket.id;
        }
    }

    socket.broadcast.emit('updateCurrentOnline', countOnline);
    console.log('a user connected', socket.id);

    socket.on('disconnect', async () => {
        countOnline -= 1;
        console.log('a user disconnected', socket.id);
        io.sockets.emit('updateCurrentOnline', countOnline);
    })

    socket.on('getCurrentOnline', () => {
        io.sockets.emit('updateCurrentOnline', countOnline);
    });


    socket.on('joinGame', async () => {
        if (game.status === StatusGame.PROCESS) return socket.emit('error', 'The game has already started.');

        if (game.users.findIndex(u => u.address == address) === -1) {
            game.users.push({
                index: game.users.length,
                address: address,
                socketId: socket.id,
                balance: 0,
                position: 0,
                countSteps: 0,
            });
            socket.join('game');
            io.to('game').emit('updateGame', game);
        }
    });

    socket.on('startGame', async () => {
        if (game.status === StatusGame.PROCESS) return socket.emit('error', 'Game started yet');
        if (game.users.length > 1) {
            game.status = StatusGame.PROCESS;
            game.nextStepSocketId = game.users[0].socketId;
            io.to('game').emit('updateGame', game);
        } else
            return socket.emit('error', 'Very few people')
    })

    socket.on('startStep', () => {
        if (game.status === StatusGame.WAITING) return socket.emit('error', 'Game not started yet');
        if (step) return socket.emit('error', 'Step already started')
        if (game.nextStepSocketId) {
            const user = game.users.find(u => u.socketId === game.nextStepSocketId);
            if (user?.socketId === socket.id) {
                step = {
                    user: user,
                    countActions: 0
                }
                const randomVal = generateRandomInteger(1, 6);
                game.users[user.index].countSteps += 1;
                if ((game.users[user.index].position + randomVal) > 39) {
                    game.users[user.index].position += (game.users[user.index].position + randomVal) - 40;
                } else
                    game.users[user.index].position += randomVal;

                const cField = game.fields[game.users[user.index].position];
                if (cField) {
                    if (cField.type === 'object') {
                        if (cField.owner) {
                            //TODO pay rent to owner
                        }
                    }
                }
            }
        }
    });

    socket.on('finishStep', () => {
        if (game.status === StatusGame.WAITING) return socket.emit('error', 'Game not started yet');
        if (step?.user) {
            if (step.user.socketId === socket.id) {
                game.nextStepSocketId = game.users[step?.user.index + 1]?.socketId ?? game.users[0].socketId;
                io.to('game').emit('updateGame', game);
                step = null;
            } else return socket.emit('error', 'The step is not yours')

        } else return socket.emit('error', 'Step not yet started')
    })

});

server.listen(process.env.PORT ?? 3000, async () => {
    console.log('listening on *:' + (process.env.PORT ?? 3000));
});

function generateRandomInteger(min: number, max: number) {
    return Math.floor(min + Math.random() * (max - min + 1))
}