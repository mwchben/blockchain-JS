import pkg from 'elliptic';
const {ec: EC } = pkg;
const ec = new EC('secp256k1');
import uuidV1 from 'uuid';

 
class ChainUtil{
    static genKeyPair(){
        const key = ec.genKeyPair();
        return key;
    }

    static id(){
        return uuidV1();
    }
}

export default ChainUtil;