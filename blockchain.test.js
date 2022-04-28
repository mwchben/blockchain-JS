import Block from "./block";
import Blockchain from "./blockchain";

describe('Blockchain', ()=>{

    let bc, bc2;

    //before each test in the "it.."
    beforeEach( ()=> {
        bc = new Blockchain();
        bc2 = new Blockchain();
    })

    it( "starts with the genesis block",()=>{
        expect(bc.chain[0]).toEqual(Block.genesis());
    })

    it( "should add a new block",()=>{

        //for the new block we require the lastBlock and data i.e mineBlock
        //the data in the added block should therefore be equal to this 'someData'
        const data = 'someData';
        bc.addBlock(data);

        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
        //the length-1 means the 2nd block(at index 1) since 1st block is genesis == index 0
    })

    it( "validates a valid chain", ()=> {
        bc2.addBlock('foo'); //as data like in 'somedata' also T or F assertions in Jest we use toBe method
        
        expect(bc.isChainValid(bc2)).toBe(true);
    })

    it( "invalidates a chain with a corrupt genesis block", ()=> {
        bc.chain[0].data = 'wrong data';

        expect(bc.isChainValid(bc2.chain)).toBe(false);
    })

    it( "invalidates a chain with corrupt block at some point in chain that is not genesis block", ()=> {
        bc2.addBlock('foo');
        bc2.chain[1].data = 'not foo';

        expect(bc.isChainValid(bc2.chain)).toBe(false);
    })

})




