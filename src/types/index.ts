declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface Character {
  index: number;
  name: string;
  hp: number;
  maxHp: number;
  imageURI: string;
  attackDamage: number;
}

interface UseContractReturn {
  checkIfUserHasNFT: () => void;
  hasNFT: boolean;
  isLoading: boolean;
}

export type UseContract = () => UseContractReturn;
