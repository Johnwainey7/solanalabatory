import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey, Keypair } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { expect } from "chai";

describe("gameov", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Gameov as Program<any>;
  const provider = anchor.getProvider();

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });

  it("Creates and mints John token!", async () => {
    // Generate a new keypair for the mint
    const mintKeypair = Keypair.generate();
    const tokenAccountKeypair = Keypair.generate();
    
    // Get the provider's wallet as the authority
    const authority = provider.wallet as anchor.Wallet;
    
    try {
      const tx = await program.methods
        .createMint()
        .accounts({
          mint: mintKeypair.publicKey,
          tokenAccount: tokenAccountKeypair.publicKey,
          authority: authority.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: anchor.web3.SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .signers([mintKeypair, tokenAccountKeypair])
        .rpc();
      
      console.log("John token minted! Transaction signature:", tx);
      console.log("Mint address:", mintKeypair.publicKey.toString());
      console.log("Token account:", tokenAccountKeypair.publicKey.toString());
      
      // Verify the mint was created successfully
      const mintInfo = await provider.connection.getAccountInfo(mintKeypair.publicKey);
      expect(mintInfo).not.toBeNull();
      
    } catch (error) {
      console.error("Error creating mint:", error);
      throw error;
    }
  });
});
