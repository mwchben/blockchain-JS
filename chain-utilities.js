import sha256 from 'crypto-js/sha256.js';

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

    //f(x) used in signTs in wallet inputs for the dataHash attr requirement
    static hash(data){
        return sha256(JSON.stringify(data)).toString();
    }
}

export default ChainUtil;