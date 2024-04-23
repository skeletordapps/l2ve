import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { chain: string; address: string; collection: string } }
) {
  const URL = `https://api.opensea.io/api/v2/chain/${params.chain}/account/${params.address}/nfts`;
  const API_KEY = process.env.OPENSEA_API_KEY as string;
  const response = await fetch(URL, {
    headers: {
      accept: "application/json",
      "x-api-key": API_KEY,
    },
  });

  const json = await response.json();

  return NextResponse.json({ nfts: json });
}
