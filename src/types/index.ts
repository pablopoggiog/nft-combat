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
  isMinting: number | null;
  characters: Character[];
  mintNft: (characterIndex: number) => void;
  userNft: Character | null;
  isModalOpen: boolean;
}

export type UseContract = () => UseContractReturn;

export interface WalletContextReturn {
  currentAccount: string;
  connectWallet: () => void;
}
