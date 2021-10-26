import { useCallback, useContext, useEffect, useState } from "react";
import { ethers, Contract } from "ethers";
import { CONTRACT_ADDRESS } from "src/constants";
import { WalletContext } from "src/contexts";
import { AttackStatus, Character, UseContract, Boss } from "src/types";
import contractData from "src/utils/contract.json";

export const useContract: UseContract = () => {
  const [hasNft, setHasNft] = useState<boolean>(false);
  const [userNft, setUserNft] = useState<Character>();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isMintingIndex, setIsMintingIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connectedContract, setConnectedContract] = useState<Contract>();
  const [boss, setBoss] = useState<Boss>({
    name: "",
    hp: "",
    maxHp: "",
    imageURI: "",
    attackDamage: "",
  });
  const [attackStatus, setAttackStatus] = useState<AttackStatus>("idle");

  const onAttackComplete = useCallback(
    async (bossHp: Boss["hp"], playerHp: Character["hp"]) => {
      setBoss((boss) => ({ ...boss!, hp: bossHp }));
      setUserNft((userNft) => ({ ...userNft!, hp: playerHp }));
      setAttackStatus("finished");
    },
    [setUserNft]
  );

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
      setUserNft(userNFT);
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
        `NFT Minted - sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`
      );

      if (connectedContract) {
        const characterNFT = await connectedContract.checkIfUserHasNFT();
        console.log({ characterNFT });
        setHasNft(true);
        setUserNft({ ...characterNFT, tokenId: tokenId.toNumber() });
        setIsModalOpen(true);
      }
    },
    [connectedContract]
  );

  const getBoss = useCallback(async () => {
    if (connectedContract) {
      const boss = await connectedContract.getBoss();
      console.log({ boss });
      return boss;
    }
  }, [connectedContract]);

  const attackBoss = useCallback(async () => {
    if (connectedContract) {
      setAttackStatus("attacking");
      try {
        const transaction = await connectedContract.attackBoss();
        await transaction.wait();
      } catch (error) {
        console.log({ error });
        setAttackStatus("idle");
      }
    }
  }, [connectedContract]);

  const fetchBoss = useCallback(async () => {
    const fetchedBoss = await getBoss();
    setBoss(fetchedBoss);
  }, [getBoss]);

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
    connectedContract?.on("AttackComplete", onAttackComplete);

    return () => {
      if (connectedContract) {
        connectedContract.off("NFTMinted", onMint);
        connectedContract.off("AttackComplete", onAttackComplete);
      }
    };
  }, [connectedContract, onMint, onAttackComplete]);

  return {
    hasNft,
    isMintingIndex,
    characters,
    mintNft,
    userNft,
    setUserNft,
    isModalOpen,
    fetchBoss,
    boss,
    attackBoss,
    attackStatus,
  };
};
