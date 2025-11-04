'use client'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export default function Navbar() {
    return (
        <div className='w-full bg-black/50 flex justify-between px-2 items-center py-2'>
            <h1 className='text-2xl font-bold'>Candy</h1>
            <WalletMultiButton />
        </div>
    )
}
