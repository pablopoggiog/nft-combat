import { useState } from "react";
import { useWallet } from ".";
import { Character, UseContract } from "src/types";

export const useContract: UseContract = () => {
  const [hasNFT, setHasNFT] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { interactWithContract } = useWallet();

  const checkIfUserHasNFT = async () => {
    interactWithContract(async (contract) => {
      setIsLoading(true);

      const userNFT: Character = await contract.checkIfUserHasNFT();
      setHasNFT(!!userNFT.name);

      setIsLoading(false);
    });
  };

  return { checkIfUserHasNFT, hasNFT, isLoading };
};
