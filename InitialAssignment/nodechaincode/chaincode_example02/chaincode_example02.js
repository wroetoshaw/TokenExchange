const { Contract } = require('fabric-contract-api');

class TokenContract extends Contract {
  async initLedger(ctx) {
    // Initialize the ledger with default data (if needed)
  }

  async generateToken(ctx, tokenId, owner) {
    const token = {
      tokenId,
      owner,
    };

    await ctx.stub.putState(tokenId, Buffer.from(JSON.stringify(token)));
  }

  async transferToken(ctx, tokenId, newOwner) {
    const tokenBytes = await ctx.stub.getState(tokenId);

    if (!tokenBytes || tokenBytes.length === 0) {
      throw new Error(`Token ${tokenId} does not exist.`);
    }

    const token = JSON.parse(tokenBytes.toString());
    token.owner = newOwner;

    await ctx.stub.putState(tokenId, Buffer.from(JSON.stringify(token)));
  }

  async queryToken(ctx, tokenId) {
    const tokenBytes = await ctx.stub.getState(tokenId);

    if (!tokenBytes || tokenBytes.length === 0) {
      throw new Error(`Token ${tokenId} does not exist.`);
    }

    return tokenBytes.toString();
  }

  async createToken(ctx, tokenId, owner) {
    const tokenBytes = await ctx.stub.getState(tokenId);

    if (tokenBytes && tokenBytes.length !== 0) {
      throw new Error(`Token ${tokenId} already exists.`);
    }

    const token = {
      tokenId,
      owner,
    };

    await ctx.stub.putState(tokenId, Buffer.from(JSON.stringify(token)));
  }

  async updateToken(ctx, tokenId, newOwner) {
    const tokenBytes = await ctx.stub.getState(tokenId);

    if (!tokenBytes || tokenBytes.length === 0) {
      throw new Error(`Token ${tokenId} does not exist.`);
    }

    const token = JSON.parse(tokenBytes.toString());
    token.owner = newOwner;

    await ctx.stub.putState(tokenId, Buffer.from(JSON.stringify(token)));
  }

  async deleteToken(ctx, tokenId) {
    const tokenBytes = await ctx.stub.getState(tokenId);

    if (!tokenBytes || tokenBytes.length === 0) {
      throw new Error(`Token ${tokenId} does not exist.`);
    }

    await ctx.stub.deleteState(tokenId);
  }
}

module.exports = TokenContract;

