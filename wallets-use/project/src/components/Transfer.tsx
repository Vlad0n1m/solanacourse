import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { SystemProgram, PublicKey, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js'
import React, { useState } from 'react'

export default function Transfer() {
    const [amount, setAmount] = useState<number>(0)
    const [recipient, setRecipient] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)
    const [transaction, setTransaction] = useState<Transaction | null>(null)
    const [transactionStatus, setTransactionStatus] = useState<string | null>(null)
    const [transactionHash, setTransactionHash] = useState<string | null>(null)
    const wallet = useWallet()
    const { connection } = useConnection()
    function checkForBase58(address: string): boolean {
        return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault()
        if (!wallet.publicKey || !recipient || amount <= 0) {
            setError('Invalid input')
            setLoading(false)
            return
        }
        if (!checkForBase58(recipient)) {
            setError('Invalid recipient address, must be a valid base58 address')
            setLoading(false)
            return
        }
        wallet.sendTransaction(new Transaction().add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey!,
            toPubkey: new PublicKey(recipient),
            lamports: amount * LAMPORTS_PER_SOL
        })), connection).then(signature => {
            setTransactionHash(signature)
            setTransactionStatus('Transaction successful')
            setSuccess(true)
            setLoading(false)
        }).catch(err => {
            setError(err.message)
            if (!err.message.includes('User rejected the request')) {
                setTransactionStatus('Transaction failed')
            }
            setSuccess(false)
            setLoading(false)
        })
    }
    return (
        <>
            <div>Transfer</div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-white/50 border-2 bg-black/50 p-4 rounded-md w-1/2 mx-auto">
                <label htmlFor="amount">Amount</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.valueAsNumber)} className="p-2 rounded-md border-white/20 border-1" />
                <label htmlFor="recipient">Recipient</label>
                <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} className="p-2 rounded-md border-white/20 border-1" />
                <button type="submit" disabled={loading} className={`bg-blue-500 text-white p-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>{loading ? 'Loading...' : 'Transfer'}</button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Transaction successful</p>}
            {transactionStatus && <p className="text-yellow-500">{transactionStatus}</p>}
            {transactionHash && <p className="text-blue-500">Transaction hash: {transactionHash}</p>}
            {transaction && <p className="text-purple-500">Transaction: {transaction.serialize().toString('hex')}</p>}
            </form>
        </>
    )
}
