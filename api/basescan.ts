import type { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const url = "https://api.basescan.org/api";
  const params = `?module=logs
   &action=getLogs
   &address=0x5f45cd59ba7f2f6bcd935663f68ee1debe3b8a10
   &fromBlock=1844947
   &toBlock=1845947
   &page=1
   &offset=1000
   &apikey=${process.env.NEXT_PUBLIC_BASESCAN_API_KEY}`;
  const requestURL = url + params;

  console.log(requestURL);
  res.status(200).json({});
};
