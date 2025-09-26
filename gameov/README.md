# Gameov - John Token Minting Program

A Solana program built with Anchor that mints "John" tokens. This program creates a token mint and automatically mints 1000 John tokens when deployed.

## Features

- ✅ Token mint creation
- ✅ Automatic minting of 1000 John tokens
- ✅ 6 decimal precision
- ✅ Full Anchor framework integration
- ✅ Comprehensive test suite

## Prerequisites

- Node.js (v16 or later)
- Rust (latest stable)
- Solana CLI tools
- Anchor framework

## Installation

1. Install dependencies:
```bash
yarn install
```

2. Install Anchor (if not already installed):
```bash
npm install -g @coral-xyz/anchor-cli
```

## Development

### Build the program:
```bash
yarn build
# or
anchor build
```

### Run tests:
```bash
yarn test
# or
anchor test
```

### Deploy to localnet:
```bash
# Start local validator (in separate terminal)
solana-test-validator

# Deploy the program
yarn deploy
# or
anchor deploy
```

### Mint John tokens:
```bash
# Run the minting script
npx ts-node scripts/mint-john.ts
```

## Program Structure

### Instructions

1. **initialize()** - Initializes the program
2. **create_mint()** - Creates a new token mint and mints 1000 John tokens

### Accounts

- `mint` - The token mint account
- `token_account` - The associated token account
- `authority` - The authority that can mint tokens
- `token_program` - The SPL Token program
- `system_program` - The Solana system program
- `rent` - The rent sysvar

## Deployment

The program is configured to deploy to localnet by default. To deploy to devnet or mainnet, update the `[provider]` section in `Anchor.toml`.

### Localnet Deployment:
```bash
# Start local validator
solana-test-validator

# Deploy
anchor deploy
```

### Devnet Deployment:
```bash
# Set cluster to devnet
solana config set --url devnet

# Deploy
anchor deploy --provider.cluster devnet
```

## Testing

The test suite includes:
- Program initialization test
- Token minting test with verification

Run tests with:
```bash
anchor test
```

## Token Details

- **Name**: John
- **Symbol**: JOHN
- **Decimals**: 6
- **Initial Supply**: 1000 tokens
- **Mint Authority**: Program authority

## Troubleshooting

### Common Issues:

1. **"Program not found"**: Make sure the program is built and deployed
2. **"Insufficient funds"**: Ensure your wallet has enough SOL for transaction fees
3. **"Account already exists"**: The mint or token account may already exist

### Getting Help:

- Check the Solana logs: `solana logs`
- Verify your wallet balance: `solana balance`
- Check program deployment: `solana program show <PROGRAM_ID>`

## License

ISC
