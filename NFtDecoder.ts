import * as borsh from "@project-serum/borsh"
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js"

const tokenMint = new PublicKey('4cSyF6Q8i63XyU85jggupnzMvDsN1QqLKUcZcFGeDkuB');

const connection = new Connection(clusterApiUrl('mainnet-beta'));

(async () => {
    console.log(connection.getAccountInfo(tokenMint))
})();
