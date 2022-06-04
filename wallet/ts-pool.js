//t = index of ts
//ts = transaction
//tsns = transactions
import Ts from "./ts.js";

class TsPool {
    constructor(){
        this.tsns = []; //will be used in Get endpoint to show transactions
    }

    updateOrAddTs(ts){
        let tsWithID = this.tsns.find(t => t.id === ts.id);

        if(tsWithID){
            //replace ts at this index with incoming ts 
            this.tsns[this.tsns.indexOf(tsWithID)] = ts;
        } else {
            //ts doesn't exist
            this.tsns.push(ts) 
        }
    }

    existingTs(address){
        return this.tsns.find(t => t.input.address === address);
    }

    validTransactions(){
        return this.tsns.filter(ts => {
            const outputTotal = ts.outputs.reduce((total, output) => {
                return total + output.amount;
            },0)

            if (ts.input.amount !== outputTotal ) {
                console.log(`Invalid transaction amount from ${ts.input.address}`);
                return;
            }

            if (!Ts.verifyTs(ts)) {
                console.log(`Invalid signature from ${ts.input.address}`);
                return;
            }

            return ts;
        })
    }
}

export default TsPool;