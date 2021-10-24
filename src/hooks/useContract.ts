import { useCallback, useContext, useEffect, useState } from "react";
import { ethers, Contract } from "ethers";
import { CONTRACT_ADDRESS } from "src/constants";
import { WalletContext } from "src/contexts";
import { Character, UseContract } from "src/types";
import contractData from "src/utils/contract.json";

export const useContract: UseContract = () => {
  const [hasNFT, setHasNFT] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [connectedContract, setConnectedContract] = useState<Contract>();

  const { currentAccount } = useContext(WalletContext);

  const setUpContract = useCallback(() => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractData.abi,
          signer
        );

        setConnectedContract(contract);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const checkIfUserHasNFT = useCallback(async () => {
    if (connectedContract) {
      const userNFT: Character = await connectedContract.checkIfUserHasNFT();
      setHasNFT(!!userNFT.name);

      setIsLoading(false);
    }
  }, [connectedContract]);

  const getAllCharacters = useCallback(async () => {
    if (connectedContract) {
      const allCharacters: Character[] =
        await connectedContract.getAllCharacters();
      setCharacters(allCharacters);
    }
  }, [connectedContract]);

  const mintNft = useCallback(
    async (characterIndex: number) => {
      if (connectedContract) {
        setIsLoading(true);
        const transaction = await connectedContract.mintNFT(characterIndex);

        await transaction.wait();

        setIsLoading(false);
      }
    },
    [connectedContract]
  );

  useEffect(() => {
    currentAccount && setUpContract();
  }, [currentAccount, setUpContract]);

  useEffect(() => {
    checkIfUserHasNFT();
  }, [checkIfUserHasNFT]);

  useEffect(() => {
    getAllCharacters();
  }, [getAllCharacters]);

  return { hasNFT, isLoading, characters, mintNft };
};
