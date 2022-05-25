import {INITIAL_BALANCE} from '../config.js';
import ChainUtil from '../chain-utilities.js'; 
//used to generate KP in constructor along with getPublic() for the public Key

class Wallet {
    constructor (){
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode("hex");
    }

    toString(){
        return `Wallet - 
        Public Key: ${this.publicKey.toString()}
        Balance : ${this.balance}`
    }
}

export default Wallet;