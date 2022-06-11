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

    calcBalance(blockchain){
        let balance = this.balance;
        //each ts object contained in each block ... array with history of all ts
        let tsns = [];  
        //for each on: -> block -> tsns
        blockchain.chain.forEach(block => block.data.forEach(ts =>{ ts.push(ts) }));

        
    }

    static bcWallet(){
        const bcWallet = new this();
        bcWallet.address = "blockchain-wallet";
        return bcWallet;
    }
} 


export default Wallet;