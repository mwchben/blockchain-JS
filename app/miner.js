
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
        // create a block consisting of the valid transactions
        // synchronize chains in the peer-to-peer server
        // clear the transaction pool
        // broadcast to every miner to clear their transaction pools
    }
}

export default Miner;

//take ts(data) from tsPool -> 
//tell p2pServer to sync chain & include new block with this ts ->
//tell tsPool to clear its ts which have been included in the bc