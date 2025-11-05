import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { burn, createAccount, createMint, getAssociatedTokenAddress, getAssociatedTokenAddressSync, getOrCreateAssociatedTokenAccount, mintTo, transfer } from "@solana/spl-token";
import * as fs from 'fs';

const connection = new Connection(clusterApiUrl('devnet'))

const secret = JSON.parse(fs.readFileSync('wallet.json').toString()) as number[]
const secretKey = Uint8Array.from(secret)
const payer = Keypair.fromSecretKey(secretKey)

const secretT = JSON.parse(fs.readFileSync('token.json').toString()) as number[]
const secretKeyT = Uint8Array.from(secretT)
const tokenKeypair = Keypair.fromSecretKey(secretKeyT)

const secretTA = JSON.parse(fs.readFileSync('tokenAccount.json').toString()) as number[]
const secretKeyTA = Uint8Array.from(secretTA)
const tokenAccountKeypair = Keypair.fromSecretKey(secretKeyTA)

async function createTokenMint() {
    const tokenMintAddress = await createMint(connection, payer, payer.publicKey, payer.publicKey, 9, tokenKeypair)
    console.log(tokenMintAddress.toBase58())
}



async function createTokenAccount() {
    // const tokenAccount = await createAccount(connection, payer, tokenKeypair.publicKey, payer.publicKey, tokenAccountKeypair)
    // console.log(tokenAccount.toBase58())
    // const ata = await getOrCreateAssociatedTokenAccount(connection, payer, tokenKeypair.publicKey, payer.publicKey )
    // console.log(ata.address.toBase58())
    const ata = getAssociatedTokenAddressSync(tokenKeypair.publicKey, payer.publicKey);
    console.log(ata.toBase58());
    const sigx = await mintTo(connection, payer, tokenKeypair.publicKey, ata, payer, 1000 * (10 ** 9))
    console.log(sigx)
}


async function transferTokens() {
    const destination = new PublicKey('8FzRarb7UAqpuV4cBDNrqQUU6Kuhez6uNVEisMSD6JEE');
    // гарантируем, что у получателя есть ATA
    const destinationAta = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        tokenKeypair.publicKey,
        destination
    );

    // гарантируем, что у отправителя ATA тоже существует
    const sourceAta = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        tokenKeypair.publicKey,
        payer.publicKey
    );
    const sigx = await transfer(connection, payer, sourceAta.address, destinationAta.address, payer, 500 * (10 ** 9));
    console.log(sigx)
}


async function burnTokens() {
    const destination = new PublicKey('8FzRarb7UAqpuV4cBDNrqQUU6Kuhez6uNVEisMSD6JEE');
    // гарантируем, что у получателя есть ATA
    const destinationAta = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        tokenKeypair.publicKey,
        destination
    );
    // гарантируем, что у отправителя ATA тоже существует
    const sourceAta = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        tokenKeypair.publicKey,
        payer.publicKey
    );
    const sigx = await burn(connection, payer, sourceAta.address, tokenKeypair.publicKey, payer.publicKey, 100*(10**9))
    console.log(sigx)
}

burnTokens()