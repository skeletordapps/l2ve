import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
export const CustomConnectButtonV2 = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
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
                    className="inline-flex justify-center items-center transition-all bg-button-v2-lg hover:scale-[1.03] hover:opacity-80 bg-no-repeat w-[189px] h-[33.5px] text-[18px] text-red-500  focus:outline-none focus-visible:ring-0 z-20"
                  >
                    WRONG NETWORK
                  </button>
                );
              }
              return (
                <div className="flex items-center gap-6 2xl:gap-12 text-[18px]">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="flex items-center gap-1 text-blue-love dark:text-dark-love"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 24,
                          height: 24,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            width={24}
                            height={24}
                          />
                        )}
                      </div>
                    )}
                    {chain.name?.toUpperCase()}
                  </button>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="flex justify-center items-center transition-all bg-button hover:scale-[1.03] hover:opacity-80 bg-contain bg-no-repeat min-w-[212px] max-w-[212px] h-[56px] font-semibold text-[14px] text-blue-love dark:text-dark-love"
                  >
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
