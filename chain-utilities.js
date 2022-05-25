import pkg from 'elliptic';
const {ec: EC } = pkg;
const ec = new EC('secp256k1');

 
class ChainUtil{
    static genKeyPair(){
        const key = ec.genKeyPair();
        return key;
    }
}

export default ChainUtil;