import WebSocket, { WebSocketServer } from 'ws';

const P2P_PORT = process.env.P2P_PORT || 5001;

//check if peers are present and put 'em in an array separated  by comma else set an empty arrat
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];

const MESSAGE_TYPES = {
    chain: "CHAIN",
    ts: "TS"
}

//serve two f(x) of sync'n bchains & keeps tsPool upToDate
export default class P2PServer {
    constructor (blockchain,tsPool){
        this.blockchain = blockchain;
        this.tsPool = tsPool;
        this.sockets = [];
    }

    //function to open a server using static server WebSocket f(x) in the ws package 
    listen(){
        const server = new WebSocketServer({ port: P2P_PORT });

        server.on('connection', (socket) => {
            this.connectSocket(socket) //accept other sockets to connect to this server 
        });

        this.connectToPeers();
        console.log(`Listening for P2P connections on: ${P2P_PORT}`);
    }

    //function to interact with socket, all sockets run via here
    connectSocket(socket){

        //this means its own
        this.sockets.push(socket);

        console.log("Socket connected");

        this.messageHandler(socket); //receive
        socket.send(JSON.stringify(this.blockchain.chain)) //send as a string since its an object(the .chain) //sendChain
    }

  
    //f(x) for true decentralization where the peers connect auto to other ws
    connectToPeers(){
        peers.forEach(peer => {
            const socket = new WebSocket(peer) //a new socket object like in "connection" event
            
            socket.on("open", () => {
                this.connectSocket(socket) //when server starts, connect this socket as a peer
            })
        })
    }


    //handles msgs i.e., between listening 4 mesg and parsing it as data
    messageHandler(socket){
        socket.on("message", message => {
            
            const data = JSON.parse(message) //JSON.parse (back to regular object)
            //console.log("data", data); & run switch case for the two types of data

            switch (data.type) {
                case MESSAGE_TYPES.chain:
                    this.blockchain.replaceChain(data.chain); //update the current bc with longest one received by that socket 
                    break;
                case MESSAGE_TYPES.ts:
                    this.tsPool.updateOrAddTs(data.ts); 
                    break;
            }
        })
    }


    sendChain(socket){
        socket.send(JSON.stringify( 
            {
                type: MESSAGE_TYPES.chain, //object type
                chain: this.blockchain.chain //object key
            } ))
    }
    sendTs(socket,ts){
        socket.send(JSON.stringify(
            { 
                type: MESSAGE_TYPES.ts, 
                ts //es6 destructured
            } ))
    }
    //used in app(index.js) for every peer to replace their chains with latest and longest
    synchronizeChain(){ 
        //forEach socket within the local array of sockets
        this.sockets.forEach(socket => this.sendChain(socket))
    }
    broadcastTs(ts){ 
        this.sockets.forEach(socket => this.sendTs(socket,ts))
    }
  
}


//..................Earlier synchChain code........................
// synchronizeChain(){ 
//     this.sockets.forEach(socket => {
//         socket.send(JSON.stringify(this.blockchain.chain))
//     })
// }

//the socket will have two data's { blockchain & ts } hence to differenciate them::
//1. attach unique type values to each data we send over a socket
//2. update msgHandler to handle incoming types and run different code based on theat