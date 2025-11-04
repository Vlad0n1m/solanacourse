import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import * as fs from 'fs';

const secret = JSON.parse(fs.readFileSync('wallet.json').toString()) as number[]
const secretKey = Uint8Array.from(secret)
const ownerKeypair = Keypair.fromSecretKey(secretKey)
console.log("sender: ", ownerKeypair.publicKey.toString())
const connection = new Connection(clusterApiUrl('devnet'));

(async () => {
    let txHash = await connection.requestAirdrop(new PublicKey('2YEnJ9sfgCevHo5QTHye4HEK5N4xHeM7nR1JYBEaqYuF'), LAMPORTS_PER_SOL * 5)
    console.log(txHash)
})();