'use client'

import { useConnection } from "@solana/wallet-adapter-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Link from "next/link";
export default function AccountInfo() {
    const { connection } = useConnection()
    const [balance, setBalance] = useState<number | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const wallet = useWallet()
    useEffect(() => {
        if (wallet.publicKey && connection) {
            connection.getBalance(wallet.publicKey).then(balance => {
                console.log(balance)
                setBalance(balance > 0 ? balance / LAMPORTS_PER_SOL : 0)
            })
        }
    }, [wallet.publicKey, connection])
    const refreshBalance = () => {
        setLoading(true)
        if (wallet.publicKey && connection) {
            connection.getBalance(wallet.publicKey).then(balance => {
                setBalance(balance> 0 ? balance / LAMPORTS_PER_SOL : 0)
                setLoading(false)
            })
        }
    }
    const airdropSOL = () => {
        setLoading(true)
        if (wallet.publicKey && connection) {
            connection.requestAirdrop(wallet.publicKey, LAMPORTS_PER_SOL*5).then(signature => {
                refreshBalance()
            })
        }
    }
    return (
        <div>
            {wallet.publicKey ? (
                <>
                    <h1>Account Info</h1>
                    <p>Address: {wallet.publicKey?.toBase58()}</p>
                    <div className="flex gap-2">
                        <p>Balance: {balance ? `${balance.toFixed(4)} SOL` : balance === 0 ? '0 SOL' : 'Loading...'}</p>
                        <button onClick={refreshBalance} disabled={loading} className={`bg-blue-500 text-white p-1 text-xs rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>{loading ? 'Loading...' : 'Refresh'}</button>
                        {balance === 0 && <button onClick={airdropSOL} className="cursor-pointer text-blue-500">Airdrop SOL</button>}
                    </div>
                </>
            ) : (
                <p>No wallet connected</p>
            )}
        </div>
    )
}