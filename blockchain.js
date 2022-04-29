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

    isChainValid (chain){

        //test 1
        if( JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis) ){
            return false;
        }


        //test 2
        for (let i=1;i<this.chain.length;i++){
            //declare the block and lastblock hashes in r/tion to 'i'th item for postn
            const block = chain[i];
            const lastBlock = chain[i-1];

            if( block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block) ){
                return false;
            }
        }

        //if all tests are passed
        return true;
    }

    replaceChain(newChain){
        if(newChain.length <= this.chain.length){
            console.log("Received chain not longer/equal to current chain");
            return;
        }
        else if(!this.isChainValid(newChain)){
            console.log("Received chain not valid");
            return;
        }

        console.log("Replacing blockchain with new Chain");
        this.chain = newChain;
    }
}