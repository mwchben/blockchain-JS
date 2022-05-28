import { send } from "express/lib/response";
import ChainUtil from "../chain-utilities.js";

  class Ts {
    constructor(){
        this.id = ChainUtil.id();
        this.input = null;
        this.outputs = [];
    }

    //the update in resulting amount when sender sends token to another address
    update(senderWallet, recepient, amount){
        const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey)
        if (amount > senderOutput.amount){
            console.log(`The amount ${amount} exceeds wallet balance`);
            return;
        }

        senderOutput.amount = senderOutput.amount - amount //updates resulting token balance
        this.outputs.push( //gives token to recepient 
            { amount, address: recepient }
        )
        Ts.signTs(this, senderWallet) //re-signs the original Ts after another ts

        return this;
    }

    static newTs(senderWallet, recepient, amount){
        const ts = new Ts();

        if (amount > senderWallet.balance){
            console.log(`The amount ${amount} exceeds wallet balance`);
            return;
        }

        //the two objects in ts outputs are are:
        //output 1: output with amount remaining and senders address
        //output 2: output with amount going out and receipient address
        //i.e.,
        // [
        //     { input: timestamp, balance: 500, signature, sendersPublicKey: 0xfoo1 } -> can send to many addresses
        //     { output 1: amount: 460, address:0xfoo1 }
        //     { output 2: amount: 40, address:0xfoo2 }
        // ]
        //since we can update the Ts with a new ts (sending token to another address) we can add a Ts Update
        // i.e., in output 2: amount: 20, address: 0xfoo3 hence  the update f(x) on top of newTs

        ts.outputs.push(...[
            { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
            { amount, address: recepient }
        ])

        //call signTs() after outputs are created statically
        // current ts object being created
        Ts.signTs(ts, senderWallet);

        return ts;

               
    }
    //f(x) generates the one of the input object with signature of Ts
    static signTs(ts,senderWallet,){
        ts.input = {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(ChainUtil.hash( ts.outputs ))
        }
    }

    //from the verifySignature method to verify the Ts as true
    static verifyTs(ts){
        return ChainUtil.verifySignature ( // ( publicKey, signature, dataHash )
            ts.input.address, ts.input.signature, ChainUtil.hash(ts.outputs)
        )
    }
}

export default Ts;