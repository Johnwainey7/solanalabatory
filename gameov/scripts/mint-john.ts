import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Gameov } from "../target/types/gameov";
import { PublicKey, Keypair } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

async function main() {
  // Configure the client to use the local cluster
  anchor.setProvider(anchor.AnchorProvider.env());
  
  const program = anchor.workspace.Gameov as Program<Gameov>;
  const provider = anchor.getProvider();
  
  console.log("🚀 Minting John tokens...");
  
  // Generate keypairs for mint and token account
  const mintKeypair = Keypair.generate();
  const tokenAccountKeypair = Keypair.generate();
  
  try {
    const tx = await program.methods
      .createMint()
      .accounts({
        mint: mintKeypair.publicKey,
        tokenAccount: tokenAccountKeypair.publicKey,
        authority: provider.wallet.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      })
      .signers([mintKeypair, tokenAccountKeypair])
      .rpc();
    
    console.log("✅ John tokens minted successfully!");
    console.log("📝 Transaction signature:", tx);
    console.log("🪙 Mint address:", mintKeypair.publicKey.toString());
    console.log("💳 Token account:", tokenAccountKeypair.publicKey.toString());
    console.log("💰 Amount minted: 1000 John tokens");
    
  } catch (error) {
    console.error("❌ Error minting tokens:", error);
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
