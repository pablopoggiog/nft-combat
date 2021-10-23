import { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import contract from "src/utils/contract.json";
import { CONTRACT_ADDRESS } from "src/constants";

export const useWallet = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  const interactWithContract = (
    callback: (contract: ethers.Contract) => void
  ) => {
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

        callback(connectedContract);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);

      if (window.ethereum.networkVersion !== "4")
        alert(
          "Hey — I see you're connected to mainnet but this only works on Rinkeby!"
        );
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = useCallback(async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return {
    currentAccount,
    connectWallet,
    interactWithContract,
  };
};
