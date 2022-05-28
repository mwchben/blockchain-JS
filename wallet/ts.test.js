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
        expect(ts.outputs.find( output => output.address === wallet.publicKey ).amount)
        //read as .find (this output {{ whose i.e., => }} address in outputs property equals this publicKey )
        .toEqual(wallet.balance - amount)
    })
    
    it("outputs `amount` added to the receipient", ()=> {
        expect(ts.outputs.find( output => output.address === recepient ).amount)
        .toEqual(amount)
    })

    //test to prove input Ts is there by checking on balance in wallet
    it("inputs the baln of the wallet", ()=> {
        expect(ts.input.amount).toEqual(wallet.balance)
    })

    //does it validate a ts and invalidate it? the ts comes also with 
    //signatures & come from unique senders
    it("it validates a valid Ts", ()=> {
        expect(Ts.verifyTs(ts)).toBe(true)
    })
    it("it invalidates a corrupt Ts", ()=> {
        ts.outputs[0].amount = 50000;
        expect(Ts.verifyTs(ts)).toBe(false)
    })

    describe("Ts amount exceeds the balance", ()=> {
        beforeEach(()=>{
            amount = 50000;
            ts = Ts.newTs(wallet,recepient,amount);
        })
    
        it("does not create the Ts ", ()=> {
            expect(ts).toEqual(undefined)
        })
    })

    describe("Updating the Ts", ()=> {

        let nextAmount, nextRecepient
        beforeEach(()=>{
            nextAmount = 20;
            nextRecepient = "n3xt-4ddr355";
            ts = ts.update(wallet, nextRecepient, nextAmount);
        })
    
        it("subtracts  the next Amount from the sender's output", ()=> {
            expect(ts.outputs.find(output => output.address === wallet.publicKey).amount)
            .toEqual(wallet.balance - amount - nextAmount )
        })
        it("outputs the amount for the next recepient", ()=> {
            expect(ts.outputs.find(output => output.address === nextRecepient).amount)
            .toEqual( nextAmount )
        })
    })
})


