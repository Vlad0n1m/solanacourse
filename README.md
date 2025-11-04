# Solana Course Project

This project contains practical examples and exercises for learning Solana blockchain development using TypeScript and the Solana Web3.js library.

## Overview

This repository includes several modules demonstrating fundamental Solana operations:

- **Module 1**: Basic account operations (balance checking, account info retrieval)
- **Module 2**: SOL transfers between accounts
- **Airdrop**: Requesting SOL from devnet faucet
- **Raw Transfer**: Advanced transfer operations (in development)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Basic understanding of TypeScript
- Solana CLI tools (optional, for wallet management)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd solanacourse
```

2. Install dependencies:
```bash
npm install
```

## Setup

1. Create a wallet file:
   - Either use the Solana CLI to generate a keypair: `solana-keygen new --outfile wallet.json`
   - Or place your existing wallet keypair in `wallet.json`

2. The `wallet.json` file should contain an array of numbers representing your secret key.

## Usage

### Module 1 - Account Information
```bash
npx ts-node module1.ts
```
This module demonstrates:
- Getting account balance
- Retrieving account information

### Module 2 - SOL Transfer
```bash
npx ts-node module2.ts
```
This module shows:
- Creating transactions
- Transferring SOL between accounts
- Signing and confirming transactions

### Airdrop
```bash
npx ts-node airdrop.ts
```
Request SOL from the devnet faucet for testing purposes.

## Network Configuration

All modules are configured to use Solana's devnet by default. To change the network, modify the `clusterApiUrl()` calls in the source files.

Available options:
- `devnet` - Development network (used in examples)
- `testnet` - Test network
- `mainnet-beta` - Main network (use with real funds only)

## Security Notes

- **Never commit your wallet.json file to version control**
- The wallet.json file contains your private key and should be kept secure
- Use devnet for testing, never use mainnet with development code
- Consider using environment variables for sensitive data in production

## File Structure

```
solanacourse/
├── module1.ts          # Basic account operations
├── module2.ts          # SOL transfers
├── airdrop.ts          # Devnet airdrop functionality
├── rawTransfer.ts      # Advanced transfer operations
├── wallet.json         # Wallet keypair (DO NOT COMMIT)
├── package.json        # Project dependencies
└── README.md           # This file
```

## Dependencies

- `@solana/web3.js`: Solana JavaScript library for interacting with the Solana blockchain

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on devnet
5. Submit a pull request

## License

This project is for educational purposes. Please refer to the license file for more information.

## Resources

- [Solana Documentation](https://docs.solana.com/)
- [Solana Web3.js Documentation](https://solana-labs.github.io/solana-web3.js/)
- [Solana Cookbook](https://solanacookbook.com/)
