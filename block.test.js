import Block from './block.js';

describe ('Block', ()=>{
    //use let(declare vars) for the whole scope of the describe f(x) instead of const in beforeEach
    let data,lastBlock,aBlock;

    beforEach( ()=>{
        //the assignment
        data = 'vote';
        lastBlock = Block.genesis();
        aBlock = Block.mineBlock(lastBlock,data);
    })

    it( 'sets `data` to match the input', ()=>{
        expect(aBlock.data).toEqual(data);
    })
   
    it( 'sets the `lastHash` to match hash of lastBlock', ()=>{
        expect(aBlock.lastHash).toEqual(lastBlock.hash);
    })

    //expect() takes an object as  1st input 
    //toEqual() runs the assertion/expectation
})
