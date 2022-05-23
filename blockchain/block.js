
import sha256 from 'crypto-js/sha256.js';
import { DIFFICULTY,MINERATE } from '../config.js';


//constructor -> function that helps us define unique attributes for any  instance of a class
//and assign them to args passed


//the block will have *(timestamp, lastHash, hash based on its own data and data itself)
//toString (debugging) returns what the specific instance of the class looks like
class Block{
    constructor(timestamp, lastHash, hash, data, nonce, difficulty){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString(){
        return `Block fields:
        Timestamp-> ${this.timestamp}
        lastHash-> ${this.lastHash.substring(0,12)}
        hash-> ${this.hash.substring(0,12)}
        Nonce-> ${this.nonce}
        difficulty -> ${this.difficulty}
        data-> ${this.data}
        `;
    }

    //static - able to call the f(x) without having to make new instance of the Block class  as long as we have the class imported
    //or not necessary need a Block instance to use it as a f(x)
    //new - create new instance of the Block class 
    //this - the f(x) itself
    static genesis(){
        return new this('begins', '____', 'first67hash23' , [], 0, DIFFICULTY);
    }

    //this f(x) will require 2 params i.e lastBlock to get its hash and the new data to be read
    //this f(x) will create new instances of a block rather than the genesis block
    //the generation of the hashes based on the lastBlock links the blocks 2gther hence the blockchain
    //sha256(`${timestamp} ${lastHash} ${data}`)
    static mineBlock(lastBlock, data){

        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDiff(lastBlock,timestamp); 
            hash = sha256(`${timestamp} ${lastHash} ${data} ${nonce} ${difficulty}`).toString();
            //or = Block.hash(timestamp,lastHash,data);
        } while (hash.substring(0,difficulty) !== '0'.repeat(difficulty));

        
        return new this(timestamp,lastHash,hash,data,nonce,difficulty);
    }

    //...........................................................................
    //for use in the blockHash f(x)
    static hash (timestamp, lastHash, data, nonce, difficulty){
        return sha256(`${timestamp} ${lastHash} ${data} ${nonce} ${difficulty}`).toString();
    }
    //f(x) that requires only the block input to generate hash of a block
    static blockHash (block) {
        const { timestamp, lastHash, data, nonce, difficulty } = block; //es6 destructuring (makes it easy to extract only what is needed.)

        return Block.hash(timestamp,lastHash,data,nonce,difficulty)
    }
    static adjustDiff(lastBlock, currentTime){
        let {difficulty } = lastBlock;
        difficulty = MINERATE + lastBlock.timestamp > currentTime ? difficulty + 1 : difficulty - 1;
        //the timestamp is added (to the checker i.e, MINERATE )since current time has greator value 
        return difficulty;
    }
    //...........................................................................
}

export default Block;