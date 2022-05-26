import Block from './block.js';
// import { DIFFICULTY } from '../config.js';
// was used here it( 'generates a hash that matches the difficulty level', ()=>{


describe ('The Block', ()=>{
    //use let(declare vars) for the whole scope of the describe f(x) instead of const in beforeEach
    let data,lastBlock,aBlock;
  
    beforeEach( ()=>{
        //the assignment
        data = 'vote';
        lastBlock = Block.genesis();
        aBlock = Block.mineBlock(lastBlock,data);
    });

    it( 'sets `data` to match the input', ()=>{
        expect(aBlock.data).toEqual(data);
    });
   
    it( 'sets the `lastHash` to match hash of lastBlock', ()=>{
        expect(aBlock.lastHash).toEqual(lastBlock.hash);
    });

    it( 'generates a hash that matches the difficulty level', ()=>{
        expect(aBlock.hash.substring(0,aBlock.difficulty)).toEqual('0'.repeat(aBlock.difficulty));
        console.log(aBlock.toString());
    });
    it( 'lowers the difficulty for slowly mined blocks', ()=>{
        expect(Block.adjustDiff(aBlock, aBlock.timestamp+360000)).toEqual(aBlock.difficulty - 1);
    });
    it( 'raises the difficulty for quickly mined blocks', ()=>{
        expect(Block.adjustDiff(aBlock, aBlock.timestamp+1)).toEqual(aBlock.difficulty + 1);
    });

    //expect() takes an object as  1st input 
    //toEqual() runs the assertion/expectation
});


// Jest doesn't support ES6 module and hence throwing this error when you directly run the test with Jest. if you want to run like that then you have to add babel.
// On the other side, when you run the test with react-scripts it uses babel behind the scene to Transpile the code.
// Usage:

// In your package.json file make the following changes:

// {
//   "scripts": {
//     "test": "jest"
//   },
//   "jest": {
//     "transform": {
//       "^.+\\.[t|j]sx?$": "babel-jest"
//     }
//   }
// }
// Create .babelrc configuration file

// Create a babel.config.json config in your project root and enable some presets.

// To start, you can use the env preset, which enables transforms for ES2015+

// npm install @babel/preset-env --save-dev
// In order to enable the preset you have to define it in your babel.config.json file, like this:

// {
//   "presets": ["@babel/preset-env"]
// }