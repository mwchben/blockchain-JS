import ChainUtil from "../chain-utilities.js";
import { MINER_REWARD } from "../config.js";

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
    
    //helper f(x) generate ts based on giving outputs i.e., for miner reward (signed by bc wallet)
    //and normal ts (signed by sender) 
    static tsWithOutputs (senderWallet, outputs ){
        const ts = new Ts();

        ts.outputs.push(...outputs); //pushing the outputs from the 2nd arg

        Ts.signTs(ts, senderWallet); 

        return ts;
    }

    static newTs(senderWallet, recepient, amount){
        // const ts = new Ts();

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

        // ts.outputs.push(...[
        //     { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
        //     { amount, address: recepient }
        // ])

            //call signTs() after outputs are created statically
            // current ts object being created
        // Ts.signTs(ts, senderWallet);

        return Ts.tsWithOutputs(senderWallet, [ //this  [] is the 2nd output arg
            { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
            { amount, address: recepient }
         ]);           
    }

    static rewardTs(minerWallet, bcWallet){ //will generate sign to confirm & auth reward ts and not miner 
        return Ts.tsWithOutputs(bcWallet, [{
            amount: MINER_REWARD, address: minerWallet.publicKey
        }])
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

//.............................. sample code of a Transaction ............................................
// [
//     {
//         "id": "067dd270-e182-11ec-8d36-69481afca498",
//         "input": {
//             "timestamp": 1654070929648,
//             "amount": 500,
//             "address": "047d0a62e3dc6687327cebb39ce9fade7b901553b6891e632bc1e9bf6f07387b36175427e502bf0ff940cde58a8d1402f0bfa75891bd1fcfca8c39e1d66738ba85",
//             "signature": {
//                 "r": "ed2c0f8ae7782c40d871f7abfbecf2aa7ce706c09a33d73ec47cec312286a7e9",
//                 "s": "2e4250b955f2c35da408318f73226cf1848e1e2e144e71dbbb3b30f31790bf45",
//                 "recoveryParam": 1
//             }
//         },
//         "outputs": [
//             {
//                 "amount": 400,
//                 "address": "047d0a62e3dc6687327cebb39ce9fade7b901553b6891e632bc1e9bf6f07387b36175427e502bf0ff940cde58a8d1402f0bfa75891bd1fcfca8c39e1d66738ba85"
//             },
//             {
//                 "amount": 50,
//                 "address": "p4sson-4ddr355"
//             },
//             {
//                 "amount": 50,
//                 "address": "p4sson-4ddr355"
//             }
//         ]
//     },
//     {
//         "id": "127b5240-e183-11ec-ad95-7792b73772ba",
//         "input": {
//             "timestamp": 1654071371906,
//             "amount": 500,
//             "address": "043112101a8838ea0086418db2faaf66ba90860242e4856c028cf61d16ce09b023340644704b55c349415bd18486475ad6d5ab9dc7b8062c58f05aa347a5f093b6",
//             "signature": {
//                 "r": "623a9696ce7d777edefdb561ed07d1f6be8dc48795eb64a70d95848f8d568fec",
//                 "s": "9f1cf712280f0c11777afd48da1887521e57ac5b5f96c2516e4d7e609f03827c",
//                 "recoveryParam": 1
//             }
//         },
//         "outputs": [
//             {
//                 "amount": 400,
//                 "address": "043112101a8838ea0086418db2faaf66ba90860242e4856c028cf61d16ce09b023340644704b55c349415bd18486475ad6d5ab9dc7b8062c58f05aa347a5f093b6"
//             },
//             {
//                 "amount": 50,
//                 "address": "p4sson2-4ddr355"
//             },
//             {
//                 "amount": 50,
//                 "address": "p4sson2-4ddr355"
//             }
//         ]
//     }
// ]
//....................................End of sample code.................................................