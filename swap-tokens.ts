import { TOKEN_SWAP_PROGRAM_ID, TokenSwap, TokenSwapLayout } from "@solana/spl-token-swap";
import { Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import * as token from '@solana/spl-token'
import * as fs from 'fs';


async function main() {
    const bobWallet = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync('BobfDsihsS3mphUNfUj5kGqwXnnAwTtGsLsuXg4HCN4y.json').toString()) as number[]))
    const tx = new Transaction();
    const connection = new Connection(clusterApiUrl('devnet'));
    const tokenSwapStateAccount = Keypair.generate();
    const rent = await TokenSwap.getMinBalanceRentForExemptTokenSwap(connection);
    
    const [swapAuthority, bump] = await PublicKey.findProgramAddress(
        [tokenSwapStateAccount.publicKey.toBuffer()],
        TOKEN_SWAP_PROGRAM_ID,
    )
    
    const tokenAMint = new PublicKey('ATovYL8bJRzkcUuwvxm2B7WDKsHNAnGbWEsXcW7gCTtg')
    const tokenBMint = new PublicKey('BTodHZuJeZdhRzzYQANkqVEshzczU4iuTrXrgJ1dC6u5')
    
    let tokenAAccountAddress = await token.getAssociatedTokenAddress(
        tokenAMint,
        swapAuthority,
        true
    )
    let tokenBAccountAddress = await token.getAssociatedTokenAddress(
        tokenBMint,
        swapAuthority,
        true
    )
    
    
    const tokenSwapStateAccountCreationInstruction = await SystemProgram.createAccount({
        newAccountPubkey: tokenSwapStateAccount.publicKey,
        fromPubkey: bobWallet.publicKey,
        lamports: rent,
        space: TokenSwapLayout.span,
        programId: TOKEN_SWAP_PROGRAM_ID,
    });

    tx.add(tokenSwapStateAccountCreationInstruction)
   

    const tokenSwapInitSwapInstruction = TokenSwap.createInitSwapInstruction(
        tokenSwapStateAccount.publicKey,
        swapAuthority,
        

    )
}
