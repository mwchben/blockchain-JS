import ChainUtil from "../chain-utilities.js";

  class Ts {
    constructor(){
        this.id = ChainUtil.id();
        this.input = null;
        this.outputs = [];
    }

    static newTs(senderWallet, recepient, amount){
        const ts = new Ts();

        if (amount > senderWallet.balance){
            console.log(`The amount ${amount} exceeds wallet balance`);
            return;
        }

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
}

export default Ts;