import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import * as fs from 'fs';

const connection = new Connection(clusterApiUrl('devnet'))
const tx = new Transaction()
// const sender = Keypair.generate()
// const receiver = Keypair.generate()

// Read the wallet.json file synchronously and parse the secret key
const secret = JSON.parse(fs.readFileSync('wallet.json').toString()) as number[]
const secretKey = Uint8Array.from(secret)
const ownerKeypair = Keypair.fromSecretKey(secretKey)
console.log("sender: ", ownerKeypair.publicKey.toString())

const receiver = Keypair.generate()

const amount = 0.001
const send = SystemProgram.transfer({
    fromPubkey: ownerKeypair.publicKey,
    toPubkey: receiver.publicKey,
    lamports: LAMPORTS_PER_SOL * amount
})
// const manualInstruction = new TransactionInstruction({
//     keys: [
//         {
//             pubKey: programDataAccount,
//             isSigner: true,
//             isWritable: true, 
//         },
//         {
//             pubKey: ownerKeypair.publicKey,
//             isSigner: true,
//             isWritable: true, 
//         },
//         {
//             pubKey: receiver.publicKey,
//             isSigner: false,
//             isWritable: true, 
//         }
//     ],
//     programId: SystemProgram.programId,
//     data: 
// })
tx.add(send)
async function main() {
    const signature = await sendAndConfirmTransaction(
        connection,
        tx,
        [ownerKeypair]
    )
    return signature
}
main().then(sig => {
    console.log(sig)
})