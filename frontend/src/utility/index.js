
export const SUPPORTED_CHAIN = 11155420;

export const isSupportedChain = (chainId) =>
    Number(chainId) === SUPPORTED_CHAIN;
