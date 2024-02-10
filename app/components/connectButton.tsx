import { ConnectButton } from "@rainbow-me/rainbowkit";
export const CustomConnectButton = () => {
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
                    className="flex justify-center items-center transition-all bg-button hover:scale-[1.03] hover:opacity-80 bg-contain bg-no-repeat min-w-[212px] max-w-[212px] h-[56px] font-semibold text-[14px] tracking-[3px] text-blue-love"
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
                    className="flex justify-center items-center transition-all bg-button hover:scale-[1.03] hover:opacity-80 bg-contain bg-no-repeat min-w-[212px] max-w-[212px] h-[56px] font-semibold text-[14px] tracking-[3px] text-red-500"
                  >
                    WRONG NETWORK
                  </button>
                );
              }
              return (
                <div className="flex items-center gap-12 text-[18px]">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="flex items-center gap-1 text-blue-love"
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
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 24, height: 24 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name?.toUpperCase()}
                  </button>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="flex justify-center items-center transition-all bg-button hover:scale-[1.03] hover:opacity-80 bg-contain bg-no-repeat min-w-[212px] max-w-[212px] h-[56px] font-semibold text-[14px] tracking-[3px] text-blue-love"
                  >
                    {account.displayName}
                    {/* {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""} */}
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
