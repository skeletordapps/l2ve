import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useDisconnect } from "wagmi";
export interface CustomConnectButtonV2 {
  isEligible: boolean;
}
export const CustomConnectButtonV2 = ({
  isEligible,
}: CustomConnectButtonV2) => {
  const { disconnectAsync } = useDisconnect();

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
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
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
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="inline-flex justify-center items-center transition-all bg-button-v2-lg hover:scale-[1.03] hover:opacity-80 bg-no-repeat w-[189px] h-[33.5px] text-[18px] text-[#F0EFEF] focus:outline-none focus-visible:ring-0 z-20"
                  >
                    CONNECT WALLET
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="inline-flex justify-center items-center transition-all bg-button-v2-lg hover:scale-[1.03] hover:opacity-80 bg-no-repeat w-[189px] h-[33.5px] text-[18px] text-yellow-200  focus:outline-none focus-visible:ring-0 z-20"
                  >
                    WRONG NETWORK
                  </button>
                );
              }
              if (!isEligible) {
                return (
                  <button
                    onClick={() => disconnectAsync()}
                    type="button"
                    className="inline-flex justify-center items-center transition-all bg-button-v2-lg hover:scale-[1.03] hover:opacity-80 bg-no-repeat w-[189px] h-[33.5px] text-[18px] text-[#F0EFEF] focus:outline-none focus-visible:ring-0 z-20"
                  >
                    CONNECT ANOTHER WALLET
                  </button>
                );
              }
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
