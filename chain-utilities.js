import pkg from 'elliptic';
const {ec: EC } = pkg;
const ec = new EC('secp256k1');

import { v1 as uuidv1 } from 'uuid';


 
class ChainUtil{
    static genKeyPair(){
        const key = ec.genKeyPair();
        return key;
    }

    static id(){
        return uuidv1();
    }
}

export default ChainUtil;