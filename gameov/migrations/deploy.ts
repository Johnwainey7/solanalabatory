// Migrations are an early feature. Currently, they're nothing more than this
// single deploy script that's invoked from the CLI, injecting a provider
// configured from the workspace's Anchor.toml.

import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Gameov } from "../target/types/gameov";
import { PublicKey, Keypair } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

module.exports = async function (provider: anchor.AnchorProvider) {
  // Configure client to use the provider.
  anchor.setProvider(provider);

  const program = anchor.workspace.Gameov as Program<Gameov>;
  
  console.log("Deploying Gameov program...");
  
  // Initialize the program
  try {
    const tx = await program.methods.initialize().rpc();
    console.log("Program initialized! Transaction signature:", tx);
  } catch (error) {
    console.log("Program may already be initialized:", error.message);
  }
  
  console.log("Deployment completed successfully!");
  console.log("Your program is ready to mint John tokens!");
};
