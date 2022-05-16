//api app for user interaction with http req (GET,POST)

import Blockchain from "../blockchain/blockchain.js";
import express from "express";

const app = express();
const bc = new Blockchain();
const HTTP_PORT = process.env.HTTP_PORT || '3001';

app.get('/blocks', (req,res) => {
    res.json(bc.chain)
})

app.listen(HTTP_PORT, () => 
    console.log(`server started at port ${HTTP_PORT}`)
)