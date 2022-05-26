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

        return ts;
    }
}

export default Ts;