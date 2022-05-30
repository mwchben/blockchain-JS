import TsPool from "./ts-pool.js";
import Wallet from "./index.js";

describe("Wallet", ()=> {

    let  wallet, tsPool;

    beforeEach(()=>{
        tsPool = new TsPool();
        wallet = new Wallet(); 
    })

    describe("is creating a ts", ()=>{
        let ts, sendAmount, receipient;

        beforeEach(()=> {
            sendAmount = 50;
            receipient = "r4ndom-addr355";
            ts = wallet.createTs(receipient, sendAmount, tsPool)
        })

        describe("and doing the same ts", ()=>{
            beforeEach(()=>{
                wallet.createTs(receipient, sendAmount, tsPool)
            })

            //@sender
            it("it doubles the sendAmount subracted from the wallet balance", ()=> {
                expect(ts.outputs.find(output => output.address === wallet.publicKey).amount)
                .toEqual(wallet.balance - sendAmount * 2);
            })
            //@receiver
            it("it clones the sendAmount amount 4 reciever", ()=> {
                expect(ts.outputs.filter(output => output.address === receipient).map(output => output.amount))
                .toEqual([sendAmount, sendAmount]);
            })
        })

       
    }) 
})