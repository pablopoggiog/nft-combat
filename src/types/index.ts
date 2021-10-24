declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface Character {
  index: number;
  name: string;
  hp: string;
  maxHp: string;
  imageURI: string;
  attackDamage: string;
}

interface UseContractReturn {
  hasNFT: boolean;
  isLoading: boolean;
  characters: Character[];
}

export type UseContract = () => UseContractReturn;

export interface WalletContextReturn {
  currentAccount: string;
  connectWallet: () => void;
}
