import TsPool from "./ts-pool.js";
import Wallet from "./index.js";
import Ts from "./ts.js";

describe("Transaction Pool", ()=> {

    let ts, wallet, tsPool;

    beforeEach(()=>{
        tsPool = new TsPool();
        wallet = new Wallet();
        ts = new Ts(wallet, 'r4nd-4dr355', 30);
        tsPool.UpdateOrAddTs(ts);
    })

    //prove tsPool adds ts in the pool
    it("adds a ts in the pool", ()=> {
        expect(tsPool.tsns.find(t => t.id === ts.id )).toEqual(ts)
    })
    it("updates a ts in the pool", ()=> {
        const oldTs = JSON.stringify(ts);
        const newTs = ts.update(wallet, 'foo-4dr355', 40) //the same ts but to a different recepient
        tsPool.UpdateOrAddTs(newTs)

        expect(JSON.stringify(tsPool.ts.find(t => t.id === newTs.id)))
        .not.toEqual( oldTs )
    })
})