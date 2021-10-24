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
  hasNft: boolean;
  isMintingIndex: number | null;
  characters: Character[];
  mintNft: (characterIndex: number) => void;
  userNft?: Character ;
  isModalOpen: boolean;
}

export type UseContract = () => UseContractReturn;

export interface WalletContextReturn {
  currentAccount: string;
  connectWallet: () => void;
}
