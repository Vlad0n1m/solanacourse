import { clusterApiUrl, Connection, Keypair, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";
import * as fs from 'fs'

const connection = new Connection(clusterApiUrl('devnet'))
const wallet = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync('./wallet.json').toString()) as number[]))
const programId = new PublicKey('EddLbx9JEwwVPP5JoS1arRc1MRVRVSW6SriaQZiWQY1o');

async function main() {
    const ix = new TransactionInstruction({
        programId: programId,
        keys: [{
            pubkey: wallet.publicKey,
            isSigner: true,
            isWritable: false
        }],
    })
    const tx = new Transaction().add(ix)
    const sig = await connection.sendTransaction(tx, [wallet])
    await connection.confirmTransaction(sig)
    console.log(sig)
}

main();