import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useCallback, useContext, useEffect } from "react";
import { useDisconnect } from "wagmi";
import { StateContext } from "../context/StateContext";

export const CustomConnectButtonV3 = () => {
  const { disconnectAsync } = useDisconnect();
  const { provider, signer, setSigner } = useContext(StateContext);

  const getButtonText = useCallback(({ chain, connected }: any) => {
    if (!connected) return "CONNECT";
    if (chain?.unsupported) return "WRONG NETWORK";

    return "DISCONNECT";
  }, []);

  const getButtonAction = useCallback(
    ({ chain, connected, openChainModal, openConnectModal }: any) => {
      if (!connected) return openConnectModal();
      if (chain?.unsupported) return openChainModal();

      disconnectAsync();
      setSigner(undefined);
    },
    []
  );

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected = ready && account && chain;
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => (
              <button
                onClick={() =>
                  getButtonAction({
                    chain,
                    connected,
                    openChainModal,
                    openConnectModal,
                  })
                }
                className="flex flex-col items-center gap-3 sm:gap-[20px]"
              >
                <div className="w-[46.48px] h-[32.18px] transition-all bg-wallet-connected-v2 hover:bg-wallet-connected-v2-hover" />
                <span className="px-[12px] transition-all bg-[#F9F9F9] hover:bg-[#F9F9F9]/80 hover:shadow-inner text-black text-[11px] sm:text-[14.62px] font-bold">
                  {getButtonText({
                    chain,
                    connected,
                    openChainModal,
                    openConnectModal,
                  })}
                </span>
              </button>
            ))()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
