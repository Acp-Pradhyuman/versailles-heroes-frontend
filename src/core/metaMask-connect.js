import { ethers } from "ethers";
import Web3Modal from "web3modal";
import USDT from "../abi/Tether.json"
import BUSD from "../abi/BUSD.json"
import MOH from "../abi/MOH.json"
import { Token } from "../core";

export const checkWalletConnectionStatus = async () => {
    if (window.ethereum && window.ethereum !== 'undefined') {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        const connectionStatus = accounts.length > 0;
        return connectionStatus;
    }
    else return ""

}

export const getUserBalance = async (walletAddress) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();

    const tether = new ethers.Contract(Token.Usdt, USDT.abi, signer);
    const busd = new ethers.Contract(Token.Busd, BUSD.abi, signer);
    const moh = new ethers.Contract(Token.Moh, MOH, signer);
    let tetherBalance = await tether.balanceOf(walletAddress);
    let busdBalance = await busd.balanceOf(walletAddress);
    let mohBalance = await moh.balanceOf(walletAddress);
    const userBalance = { usdt: ethers.utils.formatEther(tetherBalance), busd: ethers.utils.formatEther(busdBalance), moh: ethers.utils.formatEther(mohBalance) }
    return userBalance && userBalance.usdt ? userBalance : {};
}

export const connectUserToMetaMask = async () => {
    let userAccountAddress = "";
    await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => {
            userAccountAddress = res[0]
        });
    return userAccountAddress;
}