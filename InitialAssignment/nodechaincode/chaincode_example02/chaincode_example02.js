'use strict';

const { Contract } = require('fabric-contract-api');

class AssetTransfer extends Contract {

    async InitLedger(ctx) {
  const tokens = [
    { ID: 'token1', Owner: 'Alice', Balance: 100 },
    { ID: 'token2', Owner: 'Bob', Balance: 200 },
    { ID: 'token3', Owner: 'Charlie', Balance: 10000 },
    { ID: 'token4', Owner: 'Dave', Balance: 1200 },
    { ID: 'token5', Owner: 'Eve', Balance: 1245 },
  ];

  for (const token of tokens) {
    await ctx.stub.putState(token.ID, Buffer.from(JSON.stringify(token)));
    console.info(`Token ${token.ID} initialized with owner ${token.Owner} and balance ${token.Balance}`);
  }
}


    // Existing code for CreateAsset, ReadAsset, UpdateAsset, DeleteAsset, AssetExists, TransferAsset, GetAllAssets...

    // GenerateToken creates a new token with the given ID and assigns an initial balance to the owner.
    async GenerateToken(ctx, tokenId, owner, initialBalance) {
        const tokenExists = await this.TokenExists(ctx, tokenId);
        if (tokenExists) {
            throw new Error(`The token ${tokenId} already exists`);
        }

        const token = {
            ID: tokenId,
            Owner: owner,
            Balance: initialBalance,
        };

        await ctx.stub.putState(tokenId, Buffer.from(JSON.stringify(token)));
        return JSON.stringify(token);
    }

    // ReadToken returns the token stored in the world state with the given ID.
    async ReadToken(ctx, tokenId) {
        const tokenJSON = await ctx.stub.getState(tokenId);
        if (!tokenJSON || tokenJSON.length === 0) {
            throw new Error(`The token ${tokenId} does not exist`);
        }
        return tokenJSON.toString();
    }

    // UpdateToken updates an existing token's owner and balance in the world state.
    async UpdateToken(ctx, tokenId, newOwner, newBalance) {
        const exists = await this.TokenExists(ctx, tokenId);
        if (!exists) {
            throw new Error(`The token ${tokenId} does not exist`);
        }

        const updatedToken = {
            ID: tokenId,
            Owner: newOwner,
            Balance: newBalance,
        };
        return ctx.stub.putState(tokenId, Buffer.from(JSON.stringify(updatedToken)));
    }
    
    async ReadAllTokens(ctx) {
        const iterator = await ctx.stub.getStateByRange('', '');
        const allTokens = [];

        while (true) {
            const result = await iterator.next();

            if (result.value && result.value.value.toString()) {
                const tokenJSON = result.value.value.toString();
                allTokens.push(JSON.parse(tokenJSON));
            }

            if (result.done) {
                await iterator.close();
                return JSON.stringify(allTokens);
            }
        }
    }

    // DeleteToken deletes a given token from the world state.
    async DeleteToken(ctx, tokenId) {
        const exists = await this.TokenExists(ctx, tokenId);
        if (!exists) {
            throw new Error(`The token ${tokenId} does not exist`);
        }
        return ctx.stub.deleteState(tokenId);
    }

    // TokenExists returns true when a token with the given ID exists in the world state.
    async TokenExists(ctx, tokenId) {
        const tokenJSON = await ctx.stub.getState(tokenId);
        return tokenJSON && tokenJSON.length > 0;
    }

    // TransferToken transfers the ownership of a token from the current owner to a new owner.
    async TransferToken(ctx, tokenId, newOwner) {
        const tokenString = await this.ReadToken(ctx, tokenId);
        const token = JSON.parse(tokenString);
        token.Owner = newOwner;
        return ctx.stub.putState(tokenId, Buffer.from(JSON.stringify(token)));
    }
}

module.exports = AssetTransfer;

