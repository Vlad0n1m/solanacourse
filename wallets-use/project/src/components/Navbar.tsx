'use client'
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
export default function Navbar() {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        (async () => {
            setMounted(true)
        })()
    }, [])
    if (!mounted) return null
    return (
        <div className='w-full bg-black/50 flex justify-between px-2 items-center py-2'>
            <h1 className='text-2xl font-bold'>Solana Wallets</h1>
            {mounted && (
                <WalletMultiButton />
            )}
        </div>
    )
}
