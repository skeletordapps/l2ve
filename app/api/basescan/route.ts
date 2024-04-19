import { NextResponse } from "next/server";

export async function GET() {
  const url = "https://api.basescan.org/api";
  const params = `?module=logs&action=getLogs&address=0x43b63FD20A6ec01fC84645094852840D569bE9ED&fromBlock=13294754&page=1&offset=1000&apikey=${process.env.NEXT_PUBLIC_BASESCAN_API_KEY}`;
  const requestURL = url + params;

  const response = await fetch(requestURL);
  const json = await response.json();

  return NextResponse.json({
    json,
  });
}
