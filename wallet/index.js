import {INITIAL_BALANCE} from '../config.js';
import ChainUtil from '../chain-utilities.js'; 
//used to generate KP in constructor along with getPublic() for the public Key
import Ts from './ts.js';


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

    sign(dataHash){
        return this.keyPair.sign(dataHash);
    }

    createTs(recepient, amount, tsPool){
        if(amount > this.balance){
            console.log(`This ${amount} amount exceeds current balance of: ${this.balance}`);
            return;
        }
        

        let ts = tsPool.existingTs(this.publicKey);
        //then...
        if (ts) {
            ts.update(this, recepient, amount)
        } else {
            ts = Ts.newTs(this,recepient,amount)
            tsPool.updateOrAddTs(ts)
        }

        return ts;
    }
} 


export default Wallet;