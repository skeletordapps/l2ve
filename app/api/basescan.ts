import { formatEther } from "ethers";

// https://api.basescan.org/api?module=account&action=txlist&address=0x253Da544f498b85429F6ACDc6E98B36b36c1C824&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken
export type RawTransaction = {
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  nonce: string;
  timeStamp: string;
  to: string;
  tokenDecimal: string;
  tokenName: string;
  tokenSymbol: string;
  transactionIndex: string;
  value: string;
};

export type Transaction = {
  type: string;
  tx: string;
  from: string;
  to: string;
  symbol: string;
  value: string;
};

export async function l2veTxs() {
  const url = "https://api.basescan.org/api";

  const params = `?module=account&action=tokentx&address=0x253Da544f498b85429F6ACDc6E98B36b36c1C824&page=1&offset=10000&startblock=12309189&sort=desc&apikey=${process.env.NEXT_PUBLIC_BASESCAN_API_KEY}`;

  const requestURL = url + params;
  console.log(requestURL);
  const res = await fetch(requestURL);

  if (!res.ok) throw new Error("Failed to fetch data");

  const json = await res.json();

  const result: RawTransaction[] = json.result;

  const contract = "0x253da544f498b85429f6acdc6e98b36b36c1c824";

  let transactions: Transaction[] = [];

  for (let i = 0; i < result.length; i++) {
    const data = result[i];
    const tx: Transaction = {
      type: data.to === contract ? "buy" : "sell",
      tx: data.hash,
      from: data.from,
      to: data.to,
      symbol: data.tokenSymbol,
      value: formatEther(data.value),
    };

    transactions.push(tx);
  }

  return transactions;
}
