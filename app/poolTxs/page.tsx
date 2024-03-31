"use client";
import { Fragment, useEffect, useState } from "react";
import { Transaction, l2veTxs } from "../api/basescan";
import ExportExcel from "../components/excelExport";
import ExportCSV from "../components/excelExport";
import Link from "next/link";

export default function PoolTxs() {
  const [txs, setTxs] = useState<Transaction[] | null>(null);

  useEffect(() => {
    const getL2VETxs = async () => {
      const response = await l2veTxs();
      setTxs(response);
    };

    getL2VETxs();
  }, []);

  return (
    <main className="flex flex-col w-full">
      <div className="flex flex-col p-12 w-full">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-xl font-bold text-blue-love">
            Token Volatile AMM - WETH/L2VE
          </h1>
          {txs && <ExportCSV excelData={txs} />}
        </div>
        <div className="grid w-full bg-white rounded-[8px] border border-blue-love p-4 gap-3">
          <span className="font-bold text-blue-love">Type</span>
          <span className="font-bold text-blue-love">Tx</span>
          <span className="font-bold text-blue-love">From</span>
          <span className="font-bold text-blue-love">To</span>
          <span className="font-bold text-blue-love">Symbol</span>
          <span className="font-bold text-blue-love">Value</span>

          <span className="col-span-6 border-b border-b-black border-dashed pb-3 mb-3">
            {""}
          </span>
          {txs &&
            txs.map((item: Transaction, index) => (
              <Fragment key={index}>
                <span
                  className={`border-b pb-2 truncate ${
                    item.type === "buy" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.type.toUpperCase()}
                </span>
                <span className="border-b pb-2 truncate max-w-[150px]">
                  <Link
                    href={`https://basescan.org/tx/${item.tx}`}
                    target="blank"
                    className="truncate underline text-blue-love"
                  >
                    {item.tx}
                  </Link>
                </span>
                <span className="border-b pb-2 truncate">{item.from}</span>
                <span className="border-b pb-2 truncate">{item.to}</span>
                <span
                  className={`border-b pb-2 truncate max-w-[100px] ${
                    item.symbol === "L2VE" ? "text-blue-love" : "text-slate-600"
                  }`}
                >
                  {item.symbol}
                </span>
                <span className="border-b pb-2 truncate">
                  {Number(item.value).toLocaleString("en-us", {
                    maximumFractionDigits: 18,
                  })}
                </span>
              </Fragment>
            ))}
        </div>
      </div>
    </main>
  );
}
