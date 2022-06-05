import TsPool from "./ts-pool.js";
import Wallet from "./index.js";
import Ts from "./ts.js";

describe("Transaction Pool", ()=> {

    let ts, wallet, tsPool;

    beforeEach(()=>{
        tsPool = new TsPool();
        wallet = new Wallet();
        // ts = new Ts.newTs(wallet, 'r4nd-4dr355', 30);
        // tsPool.updateOrAddTs(ts);
        //replaced by createTs()
        ts = wallet.createTs('r4nd-4dr355',30,tsPool);
    })

    //prove tsPool adds ts in the pool
    it("adds a ts in the pool", ()=> {
        expect(tsPool.tsns.find(t => t.id === ts.id )).toEqual(ts)
    })
    it("updates a ts in the pool", ()=> {
        const oldTs = JSON.stringify(ts);
        const newTs = ts.update(wallet, "foo-4dr355", 40) //the same ts but to a different recepient
        tsPool.updateOrAddTs(newTs)

        expect(JSON.stringify(tsPool.tsns.find(t => t.id === newTs.id)))
        .not.toEqual( oldTs )
    })
    //clears tsns
    it("clears transactions", ()=> {
        tsPool.clearTsns();
        expect(tsPool.tsns).toEqual([])
    })

    describe("mixing valid & corrupt ts", ()=> {
        let validTsns;

        beforeEach(()=>{
            validTsns = [...tsPool.tsns];
        
            //generate loop for valid ts (odd) and corrupt (even)
            for (let i = 0; i < 6; i++) {
                wallet = new Wallet();
                ts = wallet.createTs('r4nd-4dr355',30,tsPool); 
                if (i%2 == 0) { //even
                    ts.input.amount = 89832; //corrupts
                } else {
                    validTsns.push(ts)
                }
            } 
        })           
        
        it("it shows a difference between valid and corrupt transactions", ()=> {
            expect(JSON.stringify(tsPool.tsns)).not.toEqual(JSON.stringify(validTsns))
        })
        it("it grabs valid transactions", ()=> {
            expect(tsPool.validTransactions()).toEqual(validTsns)
        })
    })
 
})