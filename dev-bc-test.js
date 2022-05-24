import Blockchain from "./blockchain/blockchain.js";

const bc = new Blockchain();

for (let i = 0; i<10; i++) {
    console.log(bc.addBlock(`good #${i}`).toString());
}