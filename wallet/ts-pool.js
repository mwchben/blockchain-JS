//t = index of ts
//ts = transaction
//tsns = transactions

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
}

export default TsPool;