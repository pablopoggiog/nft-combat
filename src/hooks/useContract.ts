import { useCallback, useContext, useEffect, useState } from "react";
import { ethers, Contract } from "ethers";
import { CONTRACT_ADDRESS } from "src/constants";
import { WalletContext } from "src/contexts";
import { Character, UseContract } from "src/types";
import contractData from "src/utils/contract.json";

export const useContract: UseContract = () => {
  const [hasNft, setHasNft] = useState<boolean>(false);
  const [userNft, setNft] = useState<Character>();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isMintingIndex, setIsMintingIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const checkIfUserhasNft = useCallback(async () => {
    if (connectedContract) {
      const userNFT: Character = await connectedContract.checkIfUserHasNFT();
      setHasNft(!!userNFT.name);
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
        setIsMintingIndex(characterIndex);
        const transaction = await connectedContract.mintNFT(characterIndex);

        await transaction.wait();

        setIsMintingIndex(null);
      }
    },
    [connectedContract]
  );

  const onMint = useCallback(
    async (sender, tokenId, characterIndex) => {
      console.log(
        `CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`
      );

      if (connectedContract) {
        const characterNFT = await connectedContract.checkIfUserHasNFT();
        console.log("CharacterNFT: ", characterNFT);
        setHasNft(true);
        setNft({ ...characterNFT, tokenId: tokenId.toNumber() });
        setIsModalOpen(true);
      }
    },
    [connectedContract]
  );

  useEffect(() => {
    currentAccount && setUpContract();
  }, [currentAccount, setUpContract]);

  useEffect(() => {
    checkIfUserhasNft();
  }, [checkIfUserhasNft]);

  useEffect(() => {
    getAllCharacters();
  }, [getAllCharacters]);

  useEffect(() => {
    connectedContract?.on("NFTMinted", onMint);

    return () => {
      if (connectedContract) {
        connectedContract.off("NFTMinted", onMint);
      }
    };
  }, [connectedContract, onMint]);

  return { hasNft, isMintingIndex, characters, mintNft, userNft, isModalOpen };
};
