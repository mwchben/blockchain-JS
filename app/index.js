//api app for user interaction with http req (GET,POST)


import express from "express";
import bodyParser from "body-parser";
import P2PServer from "./p2pServer.js";
//for the bc
import Blockchain from "../blockchain/blockchain.js";
//for the wallet
import Wallet from "../wallet/index.js";
import TsPool from "../wallet/ts-pool.js";

const app = express();
const bc = new Blockchain();
const wallet = new Wallet();
const tsPool = new TsPool();
const p2pServer = new P2PServer(bc, tsPool);

const HTTP_PORT = process.env.HTTP_PORT || 3001;

app.use(bodyParser.json());

app.get('/blocks', (req,res) => {
    res.json(bc.chain)
})
 
app.post('/mine', (req,res) => {

    const block = bc.addBlock(req.body.data)
    console.log(`New block added: ${block.toString()}`); 

    p2pServer.synchronizeChain(); //handle decentralization
    res.redirect('/blocks')
})

//GET
app.get('/tsns',(req,res) => {
    res.json(tsPool.tsns)
})

//POST::transact consist of recipient and amount
app.post('/transact',(req,res) => {
    const { recepient, amount } = req.body;
    const ts = wallet.createTs(recepient, amount, tsPool);  

    p2pServer.broadcastTs(ts); //handle decentralization
    res.redirect('/tsns')
})

app.listen(HTTP_PORT, () => 
    console.log(`Listening on port ${HTTP_PORT}`)
)
p2pServer.listen();