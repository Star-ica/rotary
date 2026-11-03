# Rotary

Save together: everyone pays in, one member takes the pot each round.

A rotating savings group (Ajo / Esusu). Joining costs a deposit equal to one contribution. Each round everyone contributes and one member, in join order, receives the pot. A missed payment is covered by the deposit and recorded as a default.

## Run
1. Serve this folder: `python3 -m http.server 8080` and open http://localhost:8080
2. Click **Connect wallet**. The app adds/switches to BOT Chain Testnet (Chain ID 968, RPC https://rpc.bohr.life, explorer https://scan.botchain.ai).
3. Click **Deploy new copy** (deploys the test token(s) and Rotary), or paste an existing address and click **Use this address**. To pin an address for everyone, set `address` in config.js.
4. Use **Get test tokens** and **Approve**, then the action cards.

## Manual deploy (Remix)
Open contracts/Rotary.sol, compile with 0.8.20+ (EVM version paris), deploy TestToken first, then Rotary with the constructor arguments listed in config.js under deploy.args.

## Notes
Testnet demo code, not audited. TestToken has a public faucet and mint.
# rotary
