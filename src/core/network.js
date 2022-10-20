const networks = {
    bscTest: {
        chainId: `0x${Number(97).toString(16)}`,
        chainName: "BSC Testnet",
        nativeCurrency: {
          name: "BNB",
          symbol: "BNB",
          decimals: 18,
        },
        rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
        blockExplorerUrls: ["https://explorer.binance.org/smart-testnet"]
      }
  };
export default networks;