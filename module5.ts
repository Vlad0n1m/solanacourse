import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import type {GetProgramAccountsConfig} from "@solana/web3.js"
import * as borsh from "@project-serum/borsh"
// const programId = new PublicKey("CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN")
// const [pda, bump] = PublicKey.findProgramAddressSync([Buffer.from("GLOBAL_STATE")], programId);
// console.log(pda.toBase58())
// console.log('bump=',bump)
// const pda2 = PublicKey.createProgramAddressSync([Buffer.from("GLOBAL_STATE"), Buffer.from([253])], programId)
// console.log('is on curve', PublicKey.isOnCurve(pda2))


const MOVIE_REVIEW_PROGRAM_ID = new PublicKey('CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN')

const movieAccountSchema = borsh.struct([
    borsh.u8("is_initialized"),
    borsh.u8("rating"),
    borsh.str("title"),
    borsh.str("description"),
]);

async function getAllRecords() {
    const config: GetProgramAccountsConfig = {
        dataSlice: {offset: 0, length: 0}
    }
    const connection = new Connection(clusterApiUrl('devnet'))
    const accounts = await connection.getProgramAccounts(MOVIE_REVIEW_PROGRAM_ID, config)
    const paginatedKeys = accounts.slice(0,10).map(acc => acc.pubkey)
    const accountsInfos = await connection.getMultipleAccountsInfo(paginatedKeys)
    for (const account of accountsInfos) {
        try {
            if (!account) continue;
            if (account && account.data.length < 5) continue; 
            const decoded = movieAccountSchema.decode(account.data);
            console.log(decoded);
        } catch (err) {

        }
    }

    
}
getAllRecords();
// console.log(pda2.toBase58())