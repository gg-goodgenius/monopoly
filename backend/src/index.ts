import express from 'express';
import http from 'http';
import {Server} from "socket.io";
import {fields} from "./contatnts";
import {ClientToServerEvents, ServerToClientEvents} from "./types/socket";
import {Game, StatusGame, Step} from "./types/game";

const app = express();
const server = http.createServer(app);

const sleep = (millis: number) => new Promise(resolve => setTimeout(resolve, millis))

const TonWeb = require("tonweb");
const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', { apiKey: 'f307083da5685e519f09b08a98a9117a262e7d5d1f563fb517b6492c785cbba7' }))
const seedA = TonWeb.utils.hexToBytes('08ac1bbb9f36301fbcf3ad9ba5fd0591b5aed398b972e6f2d0f6d5f698d3b05f')
const keyPairA = tonweb.utils.keyPairFromSeed(seedA)
const walletA = tonweb.wallet.create({
  publicKey: keyPairA.publicKey
});
const toNano = TonWeb.utils.toNano;
const BN = TonWeb.utils.BN;

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
    const userPublicKey = socket.handshake.query.publicKey as string;
    if (!address)
        return socket.disconnect(true);

    countOnline += 1;

    if (game.status === StatusGame.PROCESS) {
        const i = game.users.findIndex(u => u.address === address);
        if (i > -1) {
            game.users[i].socketId = socket.id;
            socket.join('game');
            io.to('game').emit('updateGame', game);
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
            const randomColor = Math.floor(Math.random()*16777215).toString(16);
            game.users.push({
                index: game.users.length,
                address: address,
                socketId: socket.id,
                balance: 15,
                positionFieldId: 0,
                color: '#' + randomColor,
                currentStep: false,
                publicKey: userPublicKey
            });
            socket.join('game');
            io.to('game').emit('updateGame', game);
        }
    });

    socket.on('startGame', async () => {
        if (game.status === StatusGame.PROCESS) return socket.emit('error', 'Game started yet');
        if (game.users.length > 1) {
            game.status = StatusGame.PROCESS;
            game.users[0].currentStep = true;
            io.to('game').emit('updateGame', game);

            game.users.forEach(async user => {
              const channelInitState = {
                  balanceA: toNano('15'),
                  balanceB: toNano('15'),
                  seqnoA: new BN(0),
                  seqnoB: new BN(0)
              }
              const walletB = tonweb.wallet.create({
                  publicKey: user.publicKey
              });
              const channelConfig = {
                  channelId: new BN(generateRandomInteger(0, 10000)),
                  addressA: await walletA.getAddress(),
                  addressB: await walletB.getAddress(),
                  initBalanceA: channelInitState.balanceA,
                  initBalanceB: channelInitState.balanceB
              }

              const channelA = tonweb.payments.createChannel({
                  ...channelConfig,
                  isA: true,
                  myKeyPair: keyPairA,
                  hisPublicKey: user.publicKey,
              });
              const fromWalletA = channelA.fromWallet({
                  wallet: walletA,
                  secretKey: keyPairA.secretKey
              })
              await fromWalletA.deploy().send(toNano('0.05'))
              
              await sleep(6000)

              socket.emit('initChannel', {
                channelId: channelConfig.channelId,
                publicKey: keyPairA.publicKey,
                address: await walletA.getAddress()
              })

              await fromWalletA
                  .topUp({ coinsA: channelInitState.balanceA, coinsB: new BN(0) })
                  .send(channelInitState.balanceA.add(toNano('0.05')))
            })
            
        } else
            return socket.emit('error', 'Very few people')
    })

    socket.on('finishGame', () => {
       step = null;
       game = {
           fields: fields,
           users: [],
           bank: {
               address: ''
           },
           status: StatusGame.WAITING,
           dice: [0, 0]
       };
       io.socketsLeave('game');
    });

    socket.on('startStep', () => {
        if (game.status === StatusGame.WAITING) return socket.emit('error', 'Game not started yet');
        if (step) return socket.emit('error', 'Step already started')
            const user = game.users.find(u => u.currentStep);
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
                io.to('game').emit('updateGame', game);
            }
    
    });

    socket.on('doActionStep', (type, id) => {
        // const user = game.users.find(u => u.address === address);
        if (game.status === StatusGame.WAITING) return socket.emit('error', 'Game not started yet');
        if (!step) return socket.emit('error', 'Step not already started yet');
        switch (type) {
            case "buy": {
                const field = game.fields[step.user.positionFieldId];
                if (field.type === 'object') {
                    if (!field.owner) {
                        if (field.price <= step.user.balance) {
                            field.owner = {index: step.user.index};
                            step.user.balance -= field.price;
                            socket.emit('changeBalance', -field.price);
                            io.to('game').emit('updateGame', game);
                        } else return socket.emit('error', 'Money is tight');
                    } else return socket.emit('error', 'Field already purchased')
                }
            }
            break;

            case "sell": {
                if (!id) return socket.emit('error', 'id not found');
                const field = game.fields[id]
                if (!field) return socket.emit('error', 'filed not found');
                if(field.type === 'object') {
                    if(field.owner?.index === step.user.index) {
                        game.users[step.user.index].balance += field.price*0.5;
                        socket.emit('changeBalance', field.price*0.5);
                        field.owner = undefined;
                        io.to('game').emit('updateGame', game);
                    }
                }
            }
            break;

            // case 'upgrade': {
            //     if (!id) return socket.emit('error', 'id not found');
            //     const field = game.fields[id]
            //     if (!field) return socket.emit('error', 'filed not found');
            //     if(field.type === 'object') {
            //         if(field.owner?.index === step.user.index) {
            //             if(field.price * 0.25 <= game.users[step.user.index].balance) {
            //                 field.level += 1;
            //                 game.users[step.user.index].balance -= field.price * 0.25;
            //             }
            //         }
            //     }
            // }
            // break;


            case "payRent":
                const cField = game.fields[game.users[step.user.index].positionFieldId];
                if (cField.type !== 'object') return socket.emit('error', 'You don\'t have to pay rent')
                if (cField.owner) {
                    if (cField.owner.index !== step.user.index) {
                        const priceRent = (cField.level || 1) * 0.25 * cField.price;
                        game.users[step.user.index].balance -= priceRent;
                        socket.emit('changeBalance', -priceRent);
                        game.users[cField.owner.index].balance += priceRent;
                        io.to(game.users[cField.owner.index].socketId).emit('changeBalance', -priceRent);
                        io.to('game').emit('updateGame', game);
                    } else return socket.emit('error', 'This field is yours')
                } else return socket.emit('error', 'The field hurts no one')
                break;

        }
    })

    socket.on('finishStep', () => {
        if (game.status === StatusGame.WAITING) return socket.emit('error', 'Game not started yet');
        if (step?.user) {
            if (step.user.socketId === socket.id) {
                if(game.users[step?.user.index + 1] ) {
                    game.users[step?.user.index].currentStep = false;
                    game.users[step?.user.index + 1].currentStep = true;
                } else {
                    game.users[step?.user.index].currentStep = false;
                    game.users[0].currentStep = true;
                }
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