//t = index of ts
//ts = transaction
//tsns = transactions

class TsPool {
    constructor(){
        this.tsns = [];
    }

    UpdateOrAddTs(ts){
        let tsWithID = this.tsns.find(t = t.id === ts.id);

        if(tsWithID){
            //replace ts at this index with incoming ts 
            this.tsns[this.tsns.indexOf(tsWithID)] = ts;
        } else {
            //ts doesn't exist
            this.tsns.push(ts) 
        }
    }
}

export default TsPool;