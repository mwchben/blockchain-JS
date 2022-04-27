import Block from "./block";

export default class Blockchain {
    constructor (){
        this.chain = [Block.genesis()];
    }

    addBlock(data) {
        const newBlock = Block.mineBlock(this.chain[this.chain.length-1], data);
        this.chain.push(newBlock);  
        
        return newBlock;
    }    
}