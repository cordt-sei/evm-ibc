# EVM-IBC

Extremely simple and limited use-case EVM-signer IBC transfer (WIP, POC)

## Basic Workflow

- user connects evm wallet
- fetch associated cosmos wallet
- fetch bank balances
- fetch pointer for any ibc tokens in wallet
- decode and translate any ibc denoms, pull channel-id and base denom w/ regex
- pull client-id, channel-id, counterparty chain-id and underlying asset denom (for UI use only)
- generate the list of eligible assets to transfer
- user selects token
- pull revn number + height from relevant client state
- construct ibc tx message with timeout of +10min from current time

Only allows sending a given token back over the channel from whence it came