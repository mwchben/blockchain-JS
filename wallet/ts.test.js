import Ts from "./ts.js";
import Wallet from "./index.js";

describe('The Transaction Test', ()=>{

    let ts,wallet,recepient,amount;

    beforeEach(()=> {
        wallet = new Wallet();
        amount = 50;
        recepient = 'r3c31p13nt';
        ts = new Ts.newTs(wallet,recepient,amount); 
    })

    it("outputs `amount` subtracted from tha wallet baln", ()=> {
        expect(ts.outputs.find( output => output.address === address.publicKey ))
        //read as .find (this output {{ whose i.e., => }} address in outputs property equals this publicKey )
        .toEqual(wallet.balance - amount)
    })

    it("outputs `amount` added to the receipient", ()=> {
        expect(ts.outputs.find( output => output.address === recepient ))
        .toEqual(amount)
    })
})