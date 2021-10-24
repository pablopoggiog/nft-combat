import { useCallback, useEffect, useState } from "react";
import { ethers, Contract } from "ethers";
import { CONTRACT_ADDRESS } from "src/constants";
import { Character, UseContract } from "src/types";
import contract from "src/utils/contract.json";
import { useWallet } from ".";

export const useContract: UseContract = () => {
  const [hasNFT, setHasNFT] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [connectedContract, setConnectedContract] = useState<Contract>();

  const { currentAccount } = useWallet();

  const setUpContract = useCallback(() => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          contract.abi,
          signer
        );

        setConnectedContract(connectedContract);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const checkIfUserHasNFT = useCallback(async () => {
    if (connectedContract) {
      setIsLoading(true);

      const userNFT: Character = await connectedContract.checkIfUserHasNFT();
      setHasNFT(!!userNFT.name);

      setIsLoading(false);
    }
  }, [connectedContract]);

  useEffect(() => {
    currentAccount && setUpContract();
  }, [currentAccount, setUpContract]);

  useEffect(() => {
    checkIfUserHasNFT();
  }, [checkIfUserHasNFT]);

  return { checkIfUserHasNFT, hasNFT, isLoading };
};
