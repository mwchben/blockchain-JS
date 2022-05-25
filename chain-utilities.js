import { ec as EC } from 'elliptic';
const ec = new EC('secp256k1');

 
class ChainUtil{
    static genKeyPair(){
        
        return ec.genKeyPair(); //key = ec.genKeyPair();
    }
}

export default ChainUtil;