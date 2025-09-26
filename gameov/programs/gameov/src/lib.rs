use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, MintTo, Transfer};

declare_id!("2DCqNUiMMrVjvj1ar2UdUMDcsfm7wvPcXy8SvrrK6c8u");

#[program]
pub mod gameov {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn create_mint(ctx: Context<CreateMint>) -> Result<()> {
        let cpi_accounts = MintTo {
            mint: ctx.accounts.mint.to_account_info(),
            to: ctx.accounts.token_account.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        
        // Mint 1000 John tokens to the token account
        token::mint_to(cpi_ctx, 1000 * 10_u64.pow(6))?; // 1000 tokens with 6 decimals
        
        msg!("Minted 1000 John tokens!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct CreateMint<'info> {
    #[account(
        init,
        payer = authority,
        mint::decimals = 6,
        mint::authority = authority,
    )]
    pub mint: Account<'info, Mint>,
    
    #[account(
        init,
        payer = authority,
        token::mint = mint,
        token::authority = authority,
    )]
    pub token_account: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}
