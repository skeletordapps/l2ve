"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { StateContext } from "../context/StateContext";
import {
  generalInfo,
  handleApproval,
  swap,
  userInfo,
} from "../contracts/swapper";

export default function Swap() {
  let [loading, setLoading] = useState(false);
  let [balance, setBalance] = useState(0);
  let [aero, setAero] = useState(0);
  let [aeroRatio, setAeroRatio] = useState(0);
  let [input, setInput] = useState("");
  let [ratio, _] = useState(0.00037434);
  let [paused, setPaused] = useState(false);
  let [allowance, setAllowance] = useState(0);

  const { signer, account } = useContext(StateContext);

  const onInputChange = (value: string) => {
    const re = new RegExp("^[+]?([0-9]+([.][0-9]*)?|[.][0-9]+)$");

    if (value === "" || re.test(value)) {
      setInput(value);
      setAeroRatio(Number(value) * ratio);
    }

    return false;
  };

  const onSwap = useCallback(async () => {
    setLoading(true);
    if (signer && Number(input) > 0) {
      await swap(input, signer);
      await onGeneralInfo();
      await onUserInfo();
    }
    setLoading(false);
  }, [input, signer, setLoading]);

  const onApprove = useCallback(async () => {
    setLoading(true);
    if (signer && Number(input) > 0) {
      await handleApproval(input, signer);
      await onGeneralInfo();
      await onUserInfo();
    }
    setLoading(false);
  }, [input, signer, setLoading]);

  const onUserInfo = useCallback(async () => {
    setLoading(true);
    if (account) {
      const response = await userInfo(account);
      setBalance(response?.balance || 0);
      setAllowance(response?.allowance || 0);
    }
    setLoading(false);
  }, [account, setBalance, setAllowance, setLoading]);

  const onGeneralInfo = useCallback(async () => {
    const response = await generalInfo();
    setAero(response?.aeroBalance || 0);
    setPaused(response?.isPaused || false);
  }, [setAero, setPaused]);

  useEffect(() => {
    if (account) onUserInfo();
  }, [account]);

  useEffect(() => {
    onGeneralInfo();
  }, []);

  return (
    <>
      <div className="flex flex-col relative">
        <div className="flex flex-col lg:flex-row  lg:px-[54px] ">
          <div className="flex items-center lg:items-start flex-col w-full text-[#0F61FF] lg:max-w-[20%] pt-[70px] lg:pt-[36px] px-4 z-20">
            <div className="flex flex-col items-center lg:items-start">
              <h1 className="text-[42px]">
                SWAP <span className=" text-black ">L2VE FOR AERO.</span>
              </h1>
              <div className="flex flex-col w-[400px] pb-10 text-center lg:text-start">
                <p className="text-xl text-black">1 $L2VE ~ {ratio} $AERO</p>
              </div>

              <div className="flex flex-col">
                <label className="text-lg">
                  BALANCE: {balance?.toLocaleString("en-us")}
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      placeholder="Enter L2VE Amount"
                      type="text"
                      className="w-[300px]"
                      value={input}
                      onChange={(e) => onInputChange(e.target.value)}
                    />

                    <button
                      className="absolute top-2 right-4"
                      onClick={() => onInputChange(balance.toString())}
                    >
                      MAX
                    </button>
                  </div>

                  <button
                    disabled={
                      loading ||
                      balance === 0 ||
                      Number(input) === 0 ||
                      Number(input) > balance ||
                      aeroRatio > aero ||
                      !signer ||
                      !account
                    }
                    className={`py-2 px-4  w-max ${
                      loading ||
                      balance === 0 ||
                      Number(input) === 0 ||
                      Number(input) > balance ||
                      aeroRatio > aero ||
                      !signer ||
                      !account
                        ? "bg-slate-500/30 text-white/30"
                        : "bg-blue-love text-white"
                    }`}
                    onClick={allowance >= Number(input) ? onSwap : onApprove}
                  >
                    {allowance >= Number(input) ? "SWAP" : "APPROVE"}
                  </button>
                </div>
                {aeroRatio > 0 && (
                  <span className="text-black">
                    You'll get {aeroRatio.toLocaleString("en-us")} $AERO
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end absolute top-14 right-4">
        <span>AVAILABLE: {aero.toLocaleString("en-us")} $AERO</span>
        <div className="flex items-center gap-2">
          <span>STATUS</span>
          <div
            className={`w-4 h-4 ${
              paused || aero === 0 ? "bg-red-500" : "bg-green-500"
            } rounded-full transition-all animate-pulse`}
          />
        </div>
      </div>
    </>
  );
}
