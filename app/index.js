//api app for user interaction with http req (GET,POST)

import Blockchain from "../blockchain/blockchain.js";
import express from "express";
import bodyParser from "body-parser";
import P2PServer from "./p2pServer.js";

const app = express();
const bc = new Blockchain();
const p2pServer = new P2PServer(bc);

const HTTP_PORT = process.env.HTTP_PORT || 3001;

app.use(bodyParser.json());

app.get('/blocks', (req,res) => {
    res.json(bc.chain)
})
 
app.post('/mine', (req,res) => {

    const block = bc.addBlock(req.body.data)
    console.log(`New block added: ${block.toString()}`); 
    res.redirect('/blocks')
})

app.listen(HTTP_PORT, () => 
    console.log(`Listening on port ${HTTP_PORT}`)
)
p2pServer.listen();