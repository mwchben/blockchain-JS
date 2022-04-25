import Block from './block.js';

const block = new Block('time','lastHash','hash','data');

console.log(block.toString());

//Block and not block since the genesis f(x) is in the Block class
console.log(Block.genesis().toString());