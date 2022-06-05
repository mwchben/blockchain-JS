import Wallet from "../wallet";
import Ts from "../wallet/ts";
import TsPool from "../wallet/ts-pool";

class Miner {
    constructor(blockchain, tsPool, wallet, p2pServer){
        this.blockchain = blockchain;
        this.tsPool = tsPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }

    mine(){
        const validTsns = this.tsPool.validTransactions();

        // include a reward transaction for the miner
        validTsns.push(Ts.rewardTs(this.wallet, Wallet.bcWallet()))
        // create a block consisting of the valid transactions
        const block = this.blockchain.addBlock(validTsns)
        // synchronize chains in the peer-to-peer server
        this.p2pServer.synchronizeChain()
        // clear the transaction pool
        this.tsPool.clearTsns();
        // broadcast to every miner to clear their transaction pools
        this.p2pServer.broadcastClearTsns()


        return block;
    }
}

export default Miner;

//take ts(data) from tsPool -> 
//tell p2pServer to sync chain & include new block with this ts ->
//tell tsPool to clear its ts which have been included in the bc