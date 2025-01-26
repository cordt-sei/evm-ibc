# EVM-IBC Return Transfer

Simplified EVM wallet-based IBC token return transfer interface. Allows users to send IBC tokens back to their origin chains through the original receiving channel.

## Features

- EVM wallet integration via Dynamic SDK
- Automatic Cosmos address association
- IBC token detection and validation
- Single-hop validation (prevents multi-channel transfers)
- Keplr wallet integration for destination addresses
- Chain Registry integration for denomination display
- Gas estimation and EIP-1559 support

## Prerequisites

- Node.js >=16
- Yarn
- MetaMask or other EVM wallet
- Keplr wallet (optional)

## Setup

```bash
# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
yarn dev

# Build for production
yarn build
```

## Environment Variables

```
REACT_APP_SEI_API_URL=        # Cosmos-SDK REST API endpoint
REACT_APP_SEI_RPC_URL=        # EVM RPC endpoint
REACT_APP_ENVIRONMENT_ID=     # Dynamic SDK environment ID
REACT_APP_CHAIN_ID=           # Cosmos-SDK chain ID (pacific-1)
```

## CConcept

- Connect EVM wallet
- System fetches associated Cosmos wallet
- Retrieves IBC token balances
- Validates tokens are single-hop transfers
- Decodes IBC denominations
- Displays returnable tokens
- Select token and input destination
- System constructs IBC transfer with 10-minute timeout
- Execute transfer through IBC precompile

## Development

```bash
# Run tests
yarn test

# Type checking
yarn typecheck

# Lint
yarn lint

# Format
yarn lint:fix

# Analyze bundle
yarn analyze
```

## Please note

- Only allows return transfers of IBC tokens through original channel
- Validates bech32 addresses against expected prefix
- Does not support multi-hop token transfers

## License

**MIT**
