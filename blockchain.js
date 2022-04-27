import Block from "./block";

export class Blockchain {
    constructor (){
        this.Blockchain = [Block.genesis()];
    }

    addBlock(data) {
        const newBlock = Block.mineBlock(this.Blockchain[this.Blockchain.length-1],data);
        this.Blockchain.push(newBlock); 
        
        return newBlock;
    }    
}