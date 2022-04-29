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

    //..............................in all toBe(x) the .chain is failing tests.......................
    //..............................use only bc and bc2 without the .chain...........................

    it( "validates a valid chain", ()=> {
        bc2.addBlock('foo'); 
        //as data like in 'somedata' also T or F assertions in Jest we use toBe method
        
        expect(bc.isChainValid(bc2)).toBe(true);
    })

    it( "invalidates a chain with a corrupt genesis block", ()=> {
        bc2.chain[0].data = 'wrong data';

        expect(bc.isChainValid(bc2.chain)).toBe(false);
    })

    it( "invalidates a chain with corrupt block at some point in chain that is not genesis block", ()=> {
        bc2.addBlock('foo');
        bc2.chain[1].data = 'not foo';

        expect(bc.isChainValid(bc2.chain)).toBe(false);
    })

    it( "replaces chain with a valid chain", ()=> {
        bc2.addBlock('too');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).toEqual(bc2.chain);
    })
   
    it( "chain is not replaced if newChain is not > than current chain", ()=> {
        bc.addBlock('koo');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).not.toEqual(bc2.chain);
    })

})

//useful links:
//https://stackoverflow.com/questions/45195025/what-is-the-difference-between-tobe-and-toequal-in-jest?rq=1
//https://github.com/15Dkatz/sf-chain-guides/blob/master/blockchain/index.test.js

//Eplanations:
// This is a message from jest, not bs-jest, which I haven't actually seen before. But as I understand it, 
//it means they're structurally but not physically the same.
// That they "serialize to the same string" just means that they've serialized both values, compared them and found them to be 
//identical, which suggests they're structurally equal (but doesn't guarantee it since you can override the serialization).
// toBe does physical comparison (referential identity, ie. that they are the same, not just look the same) on 
//composite values like objects and arrays, and variants in most cases compile down to a JS array as it does here.
// It's therefore often better to use toEqual in bs-jest since that does structural comparison and
// the type system protects against the problems with using non-strict equality in JS.
// Let me know if you still have issues using toEqual instead.

