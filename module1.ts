import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js"

async function getBalance(address: PublicKey): Promise<number> {
    const connection = new Connection(clusterApiUrl('devnet'))
    return connection.getBalance(address)
}
async function getAccountInfo(address: PublicKey): Promise<any> {
    const connection = new Connection(clusterApiUrl('devnet'))
    return connection.getAccountInfo(address)
}

const publicKey = new PublicKey('8FzRarb7UAqpuV4cBDNrqQUU6Kuhez6uNVEisMSD6JEE')
getBalance(publicKey).then(balance => {console.log(balance)})
getAccountInfo(publicKey).then(info => {console.log(info)})