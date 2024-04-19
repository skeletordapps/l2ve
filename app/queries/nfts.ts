export const MY_NFTS_QUERY = `
  query Minteds($wallet: String!) {
    minteds(where: {wallet: $wallet}) {
      wallet,
      tokenId,
      tokenUri,
      blockTimestamp
    }
  }
`;
