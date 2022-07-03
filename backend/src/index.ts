import express from 'express';
import http from 'http';
import {Server} from "socket.io";
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
    bank: {
        address: ''
    },
    status: StatusGame.WAITING,
    dice: [0, 0]
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
                balance: 15,
                positionFieldId: 0,
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
                game.dice[0] = generateRandomInteger(1, 6);
                game.dice[1] = generateRandomInteger(1, 6);
                const randomVal = game.dice[0] + game.dice[1]
                if ((game.users[user.index].positionFieldId + randomVal) > 39) {
                    game.users[user.index].positionFieldId += (game.users[user.index].positionFieldId + randomVal) - 40;
                } else
                    game.users[user.index].positionFieldId += randomVal;

                const cField = game.fields[game.users[user.index].positionFieldId];
                if (cField) {
                    switch (cField.type) {
                        case "object":
                            if (cField.owner) {
                                if(cField.owner.index !== user.index) {
                                    //TODO rendPrice
                                    game.users[user.index].balance -= cField.priceRent ?? 2;
                                    socket.emit('changeBalance', -2);
                                    game.users[cField.owner.index].balance += cField.priceRent ?? 2;
                                    io.to(game.users[cField.owner.index].socketId).emit('changeBalance', 2);
                                }
                            }
                            break;
                        case "tax":
                            //TODO pay tax
                            break;
                        case "company":
                            //TODO pay to user
                            break;
                        case "court":
                            //TODO todo?
                            break;

                    }
                }
            }
        }
    });

    socket.on('doActionStep', (type, id) => {
        // const user = game.users.find(u => u.address === address);
        if (game.status === StatusGame.WAITING) return socket.emit('error', 'Game not started yet');
        if (!step) return socket.emit('error', 'Step not already started yet');
        // if(!user) return;
        switch (type) {
            case "buy":
                const field = game.fields[step.user.positionFieldId];
                if(field.type === 'object') {
                    if(!field.owner) {
                        if (field.price <= step.user.balance) {
                            field.owner = { index: step.user.index };
                            step.user.balance -= field.price;
                            socket.emit('changeBalance', -field.price);
                            io.to('game').emit('updateGame', game);
                        } else return socket.emit('error', 'Money is tight');
                    } else return socket.emit('error', 'Field already purchased')
                }
                break;
        }
    })

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