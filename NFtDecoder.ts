import * as borsh from "@project-serum/borsh"
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js"

const borshMetadataLayout = borsh.struct([
    borsh.u8('key'),
    borsh.publicKey('updateAuthority'),
    borsh.publicKey('mint'),
    borsh.str('name'),
])


async function main() {
    const tokenMint = new PublicKey('4cSyF6Q8i63XyU85jggupnzMvDsN1QqLKUcZcFGeDkuB');
    const tokenMetadataProgram = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

    const connection = new Connection(clusterApiUrl('mainnet-beta'));
    const [metadataPDA, bump] = PublicKey.findProgramAddressSync([Buffer.from("metadata"), tokenMetadataProgram.toBytes(), tokenMint.toBytes()], tokenMetadataProgram);

    const accountInfo = await connection.getAccountInfo(metadataPDA)

    if (accountInfo) {
        const metadata = borshMetadataLayout.decode(accountInfo.data);
        console.log(metadata.name)
    }
}

main(); 