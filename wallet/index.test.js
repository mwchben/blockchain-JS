import TsPool from "./ts-pool.js";
import Wallet from "./index.js";
import BlockChain from '../blockchain/blockchain.js';
import {INITIAL_BALANCE } from '../config.js';

describe("Wallet", ()=> {

    let  wallet, tsPool, bc;

    beforeEach(()=>{
        tsPool = new TsPool();
        wallet = new Wallet(); 
        bc = new BlockChain();
    })

    describe("is creating a ts", ()=>{
        let ts, sendAmount, receipient;

        beforeEach(()=> {
            sendAmount = 50;
            receipient = "r4ndom-addr355";
            ts = wallet.createTs(receipient, sendAmount,bc, tsPool)
        })

        describe("and doing the same ts", ()=>{
            beforeEach(()=>{
                wallet.createTs(receipient, sendAmount, bc, tsPool)
            })

            //@sender
            it("it doubles the sendAmount subracted from the wallet balance", ()=> {
                expect(ts.outputs.find(output => output.address === wallet.publicKey).amount)
                .toEqual(wallet.balance - sendAmount * 2);
            })
            //@receiver
            it("it clones the sendAmount amount 4 reciever", ()=> {
                expect(ts.outputs.filter(output => output.address === receipient).map(output => output.amount))
                .toEqual([sendAmount, sendAmount]);
            })
        })

       
    }) 
    describe ("calculate balance", ()=>{
        let addBalance, senderWallet, repeatAdd;

        beforeEach(()=>{
            addBalance = 100;
            senderWallet = new Wallet();
            repeatAdd = 3;

            for (let i=1; i<repeatAdd; i++ ){
                senderWallet.createTs(wallet.publicKey, addBalance, bc, tsPool)
            }
        })

        it('calculates the balance for bc transactions matching the recepient', ()=>{
            expect(wallet.calcBalance(bc)).toEqual(INITIAL_BALANCE + (addBalance*repeatAdd))
        })
        it('calculates the balance for bc transactions matching the sender', ()=>{
            expect(senderWallet.calcBalance(bc)).toEqual(INITIAL_BALANCE - (addBalance*repeatAdd))
        })
    })
})