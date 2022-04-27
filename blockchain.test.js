import Block from "./block";
import Blockchain from "./blockchain";

describe('Blockchain', ()=>{

    let bc;

    //before each test in the "it.."
    beforeEach( ()=> {
        bc = new Blockchain();
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

})