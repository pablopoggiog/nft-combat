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
  tokenId?: number;
}

interface UseContractReturn {
  hasNft: boolean;
  isMintingIndex: number | null;
  characters: Character[];
  mintNft: (characterIndex: number) => void;
  userNft?: Character;
  setUserNft: React.Dispatch<React.SetStateAction<Character | undefined>>;
  isModalOpen: boolean;
  fetchBoss: () => void;
  boss: Boss;
  attackBoss: () => void;
  attackStatus: AttackStatus;
}

export type UseContract = () => UseContractReturn;

export interface WalletContextReturn {
  currentAccount: string;
  connectWallet: () => void;
}

export interface Boss {
  name: string;
  hp: string;
  maxHp: string;
  imageURI: string;
  attackDamage: string;
}

export type AttackStatus = "idle" | "attacking" | "finished";
