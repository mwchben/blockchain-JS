import WebSocket, { WebSocketServer } from 'ws';

const P2P_PORT = process.env.P2P_PORT || 5001;

//check if peers are present and put 'em in an array separated  by comma else set an empty arrat
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];

export default class P2PServer {
    constructor (blockchain){
        this.blockchain = blockchain;
        this.sockets = [];
    }

    //function to interact with socket, all sockets run via here
    connectSocket(socket){

        //this means its own
        this.sockets.push(socket);

        console.log("Socket connected");

        this.messageHandler(socket); //receive
        socket.send(JSON.stringify(this.blockchain.chain)) //send as a string since its an object(the .chain)
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

    //function to open a server using static server WebSocket f(x) in the ws package 
    listen(){
        const server = new WebSocketServer({ port: P2P_PORT });

        server.on('connection', (socket) => {
            this.connectSocket(socket) //accept other sockets to connect to this server 
        });

        this.connectToPeers();
        console.log(`Listening for P2P connections on: ${P2P_PORT}`);
    }

    //handles msgs between
    messageHandler(socket){
        socket.on("message", message => {
            //JSON.parse (back to regular object)
            const data = JSON.parse(message)
            console.log("data", data); 
        })
    }
  
}
