import Block from './block.js';

const block = new Block('time','lastHash','hash','data');

console.log("For 1st "+block.toString());

//Block and not block since the genesis f(x) is in the Block class
console.log("For Genesis "+Block.genesis().toString());

//test fot the mineBlock
const testForMineBlock = Block.mineBlock(Block.genesis(),'someData');
console.log("For mine "+testForMineBlock.toString());