import {INITIAL_BALANCE} from '../config';

class Wallet {
    constructor (){
        this.balance = INITIAL_BALANCE;
        this.keyPair = null;
        this.publicKey = null;
    }

    toString(){
        return `Wallet - 
        Public Key: ${this.publicKey.toString()}
        Balance : ${this.balance}`
    }
}

export default Wallet;