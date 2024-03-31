import React, { useState } from "react";
import { saveAs } from "file-saver";
import { Transaction } from "../api/basescan";

function ExportCSV({ excelData }: any) {
  const handleExport = () => {
    if (excelData) {
      const csvString = excelData
        .map((item: Transaction) => Object.values(item).join(","))
        .join("\n");
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "weth/love-txs.csv"); // Change filename if needed
    }
  };

  return (
    <button
      className="bg-blue-love p-2 px-4 rounded-full text-white text-sm hover:shadow-md hover:scale-105 transition-all"
      onClick={handleExport}
    >
      Export to CSV
    </button>
  );
}

export default ExportCSV;
