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
            senderWallet = new Wallet();
            addBalance = 100;            
            repeatAdd = 3;

            for (let i=0; i<repeatAdd; i++ ){
                senderWallet.createTs(wallet.publicKey, addBalance, bc, tsPool)
            }
            bc.addBlock(tsPool.tsns)
        })

        it('calculates the balance for bc transactions matching the recepient', ()=>{
            expect(wallet.calcBalance(bc)).toEqual(INITIAL_BALANCE + (addBalance * repeatAdd))
        })
        it('calculates the balance for bc transactions matching the sender', ()=>{
            expect(senderWallet.calcBalance(bc)).toEqual(INITIAL_BALANCE - (addBalance * repeatAdd))
        })

        describe("and the recepient conducts a transaction",()=>{
            let subtractBalance, receipientBalance;
            
            beforeEach(()=>{
                tsPool.clear(); //remove the original pool
                subtractBalance = 60;
                receipientBalance = wallet.calcBalance(bc);
                wallet.createTs(senderWallet.publicKey, subtractBalance, bc, tsPool);
                bc.addBlock(tsPool.tsns);
            })

            describe ("and the  sender sends another transaction to the receipient", ()=>{

                beforeEach(()=>{
                    tsPool.clear();
                    senderWallet.createTs(wallet.publicKey, addBalance, bc, tsPool);
                    bc.addBlock(tsPool.tsns)
                })

                it("calculates the receipient balance using the most recent transaction", ()=>{
                    expect(wallet.calcBalance(bc)).toEqual(receipientBalance- subtractBalance + addBalance)
                })
            })
        })
    })
})